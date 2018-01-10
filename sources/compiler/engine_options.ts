class JsHtmlEngineOptions {
    static forEditor(): JsHtmlEngineOptions {
        return new JsHtmlEngineOptions(true);
    }

    static forRuntime(): JsHtmlEngineOptions {
        return new JsHtmlEngineOptions();
    }


    constructor(editorMode: boolean = false) {
        this.editorMode = editorMode;
        this.phases = []
        this.features = [];
    }


    public readonly editorMode;
    public readonly phases;
    public readonly features;
}


export default JsHtmlEngineOptions