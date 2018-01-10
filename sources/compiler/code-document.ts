import JsHtmlSourceDocument from "./source-document";


export default class JsHtmlCodeDocument {
    public constructor(
        public readonly source: JsHtmlSourceDocument,
        private readonly _imports: JsHtmlSourceDocument[] = []) {
        if (!source) throw new Error('ILLEGAL_ARG');
    }


    public readonly items = new Map();


    public get imports() {
        return this._imports.slice();
    }
}