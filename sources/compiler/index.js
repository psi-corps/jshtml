
import {Logger} from './logger'
import {Buffer} from 'buffers'


class JsHtmlCompiler {
    constructor(ignoreBindings = false, logger = Logger.NULL) {
        this._ = {};
        this._.ignoreBindings = !!ignoreBindings;
        if (!((this._.logger = logger || Logger.NULL) instanceof Logger)) throw new Error();
    }


    compile(jsHtmlTemplate) {
        try {
            this._.logger.info(`Started compiling ${jsHtmlTemplate.key}.`);

            const body = this._generateBodySource(jsHtmlTemplate.source);
            const func = this._constructFunctionSource(body);

            this._.logger.info('Completed.');

            return {key: jsHtmlTemplate.key, source: source};    
        } catch (err) {
            this._.logger.error(err);
            this._.logger.info('Compilation failed.')
            throw { message: err.message, handled: true };
        }
    }


    _generateBodySource(source) {
        const tokens = [];  

        // TODO: Add whitespace sanitizing;
        // TODO: Add imports support;

        for (let i = 0; i < source.length; ++i) {
            const token = source[i] == '@'
                ? this._createCodeToken({i, source, tokens})
                : this._createLiteralToken({i, source, tokens});

            i = token.i;
            
            tokens.push(token);
        }

        return tokens.join('');
    }

    _createCodeToken(ctx) {
        // start:
            // @helper -- not suported;
            // @import -- not supported;
            // @(view, model)
            // @(model)
            // @{ code block }
        //const stack = [];
        
        ++ctx.i;

        if (ctx.source[ctx.i] == '(') return this._createRenderViewToken(ctx);
        if (ctx.source[ctx.i] == '{') return this._resolveCodeBlockToken(ctx);
        if (isLetter(ctx.source[ctx.i])) return this._createExpressionToken(ctx);
        if (ctx.source[ctx.i] == '&' || ctx.source[ctx.i] == '>' || ctx.source[ctx.i] == '<')
            return this._createBindingToken(ctx, ctx.source[ctx.i]);
        
        // log;
        // stabilize;
        // return;
    }

    _createRenderViewToken(ctx) {
        let opens = 1;
        let i = ctx.i;
        const token = [];

        while (i < ctx.source.length) {
            if (ctx.source[i] == '(') {
                ++opens;
            } else if (ctx.source[i] == ')') {
                if (--opens < 0) {

                } else if (badBefore) {

                } 
            } else if (ctx.source[i] == '') {

            }

            token.push(ctx.source[i]);
        }

        for (let i = ctx.i + 1; i < ctx.source.length && opens != 0 && ctx.source[i] != ')'; ++i) {
            if (ctx.source[i] == ')') {
                if (--opens < 0) {

                }
            } else {
                token.push(ctx.source[i])
            }
        }

        // starts: (
        // ends: )
    }

    _createCodeBlockToken(ctx) {

    }

    _createExpressionToken(ctx) {
        let i = ctx.i;
        let opens = 0;
        let token = [];

        for (let i = ctx.i; i < ctx.source.length || !isNewLine(ctx.source[i]); ++i) {
            // starts: letter or underscore or $ or opening brace;
            // ends: \r\n or underscore or letter or digit or closing brace;
            // after: tag or literal or single quote or double quote or space;
        }
        
        // log
        // stabilize;
        // function call;
        // property evaluate;
    }

    _createBindingToken(ctx, binding) {
        
    };

    _createLiteralToken() {

    }

    _constructFunctionSource(body) {

    }
}


export default JsHtmlCompiler