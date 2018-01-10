import Logger from '../logger';
import KeyTransform from '../key-transfrom'
import JsHtmlCompiler from '../compiler'


const DEFAULT_DESTINATION = 'js-html-templates-';
const DEFAULT_BASE_PATH = __dirname;

const DEFAULT_OPTIONS = {
    bundle: false,
    keyTransform: KeyTransform.DEFAULT,
    basePath: DEFAULT_BASE_PATH,
    destination: DEFAULT_DESTINATION
};


class JsHtmlBuilder {
    constructor(options = DEFAULT_OPTIONS, logger = Logger.NULL) {
        this._ = {};

        options = options || DEFAULT_OPTIONS;

        if (!((this._.logger = logger) instanceof Logger))
            throw new Error();
        
        if (!((this._.keyTransform = options.keyTransform || KeyTransform.DEFAULT) instanceof KeyTransform))
            throw new Error();
        
        this._.destination = path.join(options.basePath || DEFAULT_BASE_PATH, options.destination || DEFAULT_DESTINATION);
        this._.bundle = !!options.bundle || false;
        this._.compiler = new JsHtmlCompiler(logger);
    }


    build(sourceFiles) {
        try {
            if (!(sourceFiles instanceof Array)) throw Error('Argument must be an array');

            this._.logger.info('Started build.');
            
            const compiled = this._compile(sourceFiles);

            this._logger.info('Build success.');

            return this._saveResult(compiled);
        } catch (err) {
            if (!err.handled) this._.logger.error(err);
            this._logger.info('Build failed.');
            throw err;
        }
    }


    _compile(sourceFiles) {
        this._.logger.info('Started compiling templates.');
            
        const tmpls = sourceFiles
            .map(f => this._.compiler.compile({
                key: this._.keyTransform.toKey(f),
                source: fs.readFileSync(f, {encoding: 'utf-8'})
            }));

        this._.logger.info('All templates are compiled.');

        return tmpls;
    }

    _bundle(compiled) {
        throw new Error('Not implemented yet.');
    }

    _directory(compiled) {
        const result = tmpls.map(t => {
            const fileName = this._.keyTransform.toFileName(t.key);
            const fullName = path.join(this._.destination, fileName);

            this._.logger.trace(`Writing file [${fullName}] for template [${t.key}]`);

            fs.writeFileSync(path.join(this._.destination), fileName);

            return fullName;
        });

        return {bundled: false, templates: result};
    }

    _saveResult(compiled) {
        this._.logger.info('Saving results.');

        if (fs.existsSync(this._.destination) && fs.statSync(this._.destination).isDirectory()) {
            rimraf(this._.destination);
        }

        const result = this._.bundle ? this._bundle(compiled) : this._directory(compiled);

        this._.logger.info('Results saved.');

        return result;
    }
}


export default JsHtmlBuilder