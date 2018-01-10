class JsHtmlSourceLocation {
    static readonly undefined = new JsHtmlSourceLocation(null, -1, -1, -1);
    static readonly zero = new JsHtmlSourceLocation(null, 0, 0, 0);


    static fromSpan(span: JsHtmlSourceSpan): JsHtmlSourceLocation {
        return span
            ? new JsHtmlSourceLocation(span.path, span.absoluteIndex, span.lineIndex, span.characterIndex)
            : JsHtmlSourceLocation.undefined;

    }

    
    constructor(
        readonly path: string,
        readonly absoluteIndex: number,
        readonly lineIndex: number,
        readonly characterIndex: number) { }
    

    equals(obj: JsHtmlSourceLocation): boolean {
        // return string.Equals(FilePath, other.FilePath, StringComparison.Ordinal) &&
        //         AbsoluteIndex == other.AbsoluteIndex &&
        //         LineIndex == other.LineIndex &&
        //         CharacterIndex == other.CharacterIndex;
        return false;
    }

    toString(): string {
        return `(${this.absoluteIndex}:${this.lineIndex},${this.characterIndex})`;
    }
}