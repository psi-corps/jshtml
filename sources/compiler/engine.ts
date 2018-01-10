import JsHtmlEngineOptions from './engine_options'
import JsHtmlCodeDocument from './code-document'


class JsHtmlEngine {
    private readonly _phases;
    private readonly _features;

    constructor(options: JsHtmlEngineOptions) {
        if (!options) throw new Error('ILLEGAL_ARG');

        this.editorMode = options.editorMode;
        this._phases = options.phases;
        this._features = options.features;
        // this._.phases.forEach(p => p.engine = this);
        // this._.features.forEach(f => f.engine = this);
    }


    public readonly editorMode;


    public get phases() {
        return this._phases.slice()
    }

    public get features() {
        return this._features.slice();
    }


    process(doc: JsHtmlCodeDocument) {
        if (!doc) throw new Error('ILLEGAL_ARGUMENT');
        this.phases.forEach(p => p.execute(doc));
    }
}


Object.freeze(JsHtmlEngine);
Object.freeze(JsHtmlEngine.prototype);


export default JsHtmlEngine;

/*

public static RazorEngine Create(Action<IRazorEngineBuilder> configure)
        {
            var builder = new DefaultRazorEngineBuilder(designTime: false);
            AddDefaults(builder);
            AddRuntimeDefaults(builder);
            configure?.Invoke(builder);
            return builder.Build();
        }

        public static RazorEngine CreateDesignTime(Action<IRazorEngineBuilder> configure)
        {
            var builder = new DefaultRazorEngineBuilder(designTime: true);
            AddDefaults(builder);
            AddDesignTimeDefaults(builder);
            configure?.Invoke(builder);
            return builder.Build();
        }

        public static RazorEngine CreateEmpty(Action<IRazorEngineBuilder> configure)
        {
            var builder = new DefaultRazorEngineBuilder(designTime: false);
            configure?.Invoke(builder);
            return builder.Build();
        }

        internal static void AddDefaults(IRazorEngineBuilder builder)
        {
            builder.Phases.Add(new DefaultRazorParsingPhase());
            builder.Phases.Add(new DefaultRazorSyntaxTreePhase());
            builder.Phases.Add(new DefaultRazorTagHelperBinderPhase());
            builder.Phases.Add(new DefaultRazorIntermediateNodeLoweringPhase());
            builder.Phases.Add(new DefaultRazorDocumentClassifierPhase());
            builder.Phases.Add(new DefaultRazorDirectiveClassifierPhase());
            builder.Phases.Add(new DefaultRazorOptimizationPhase());
            builder.Phases.Add(new DefaultRazorCSharpLoweringPhase());

            // General extensibility
            builder.Features.Add(new DefaultRazorDirectiveFeature());
            builder.Features.Add(new DefaultRazorTargetExtensionFeature());

            // Syntax Tree passes
            builder.Features.Add(new DefaultDirectiveSyntaxTreePass());
            builder.Features.Add(new HtmlNodeOptimizationPass());

            // Intermediate Node Passes
            builder.Features.Add(new DefaultDocumentClassifierPass());
            builder.Features.Add(new MetadataAttributePass());
            builder.Features.Add(new DirectiveRemovalOptimizationPass());
            builder.Features.Add(new DefaultTagHelperOptimizationPass());

            // Default Code Target Extensions
            builder.AddTargetExtension(new MetadataAttributeTargetExtension());

            // Default configuration
            var configurationFeature = new DefaultDocumentClassifierPassFeature();
            configurationFeature.ConfigureClass.Add((document, @class) =>
            {
                @class.ClassName = "Template";
                @class.Modifiers.Add("public");
            });

            configurationFeature.ConfigureNamespace.Add((document, @namespace) =>
            {
                @namespace.Content = "Razor";
            });

            configurationFeature.ConfigureMethod.Add((document, method) =>
            {
                method.MethodName = "ExecuteAsync";
                method.ReturnType = $"global::{typeof(Task).FullName}";

                method.Modifiers.Add("public");
                method.Modifiers.Add("async");
                method.Modifiers.Add("override");
            });

            builder.Features.Add(configurationFeature);
        }

        internal static void AddRuntimeDefaults(IRazorEngineBuilder builder)
        {
            // Configure options
            builder.Features.Add(new DefaultRazorParserOptionsFeature(designTime: false, version: RazorParserOptions.LatestRazorLanguageVersion));
            builder.Features.Add(new DefaultRazorCodeGenerationOptionsFeature(designTime: false));

            // Intermediate Node Passes
            builder.Features.Add(new PreallocatedTagHelperAttributeOptimizationPass());

            // Code Target Extensions
            builder.AddTargetExtension(new DefaultTagHelperTargetExtension() { DesignTime = false });
            builder.AddTargetExtension(new PreallocatedAttributeTargetExtension());
        }

        internal static void AddDesignTimeDefaults(IRazorEngineBuilder builder)
        {
            // Configure options
            builder.Features.Add(new DefaultRazorParserOptionsFeature(designTime: true, version: RazorParserOptions.LatestRazorLanguageVersion));
            builder.Features.Add(new DefaultRazorCodeGenerationOptionsFeature(designTime: true));
            builder.Features.Add(new SuppressChecksumOptionsFeature());

            // Intermediate Node Passes
            builder.Features.Add(new DesignTimeDirectivePass());

            // Code Target Extensions
            builder.AddTargetExtension(new DefaultTagHelperTargetExtension() { DesignTime = true });
            builder.AddTargetExtension(new DesignTimeDirectiveTargetExtension());
        }
    }

*/