class JsHtmlSourceSpan {
    static readonly undefined = JsHtmlSourceSpan.fromLocation(JsHtmlSourceLocation.undefined, 0);


    static fromAbsolute(absoluteIndex: number, length: number): JsHtmlSourceSpan {
        return new JsHtmlSourceSpan(null, absoluteIndex, -1, -1, length);
    }

    static fromLocation(location: JsHtmlSourceLocation, length: number): JsHtmlSourceSpan {
        return new JsHtmlSourceSpan(location.path, location.absoluteIndex, location.lineIndex,
            location.characterIndex, length);
    }
    
    static create(absoluteIndex: number, lineIndex: number, characterIndex: number, length: number): JsHtmlSourceSpan {
        return new JsHtmlSourceSpan(null, absoluteIndex, lineIndex, characterIndex, length);
    }


    constructor(path: string, absoluteIndex: number, lineIndex: number, charIndex: number, length: number) {
        this.absoluteIndex = absoluteIndex
        this.lineIndex = lineIndex
        this.characterIndex = charIndex
        this.length = length
        this.path = path
    }


    readonly length: number
    readonly lineIndex: number
    readonly characterIndex: number
    readonly absoluteIndex: number
    readonly path: string


    equals(obj: JsHtmlSourceSpan): boolean {
        return this.path.toLowerCase() == obj.path
            && this.absoluteIndex == obj.absoluteIndex
            && this.lineIndex == obj.lineIndex
            && this.characterIndex == obj.characterIndex
            && this.length == obj.length
    }

    toString(): string {
        return `(${this.absoluteIndex}:${this.lineIndex},${this.characterIndex} [${this.length}] ${this.path})`;
    }
}


Object.freeze(JsHtmlSourceSpan)
Object.freeze(JsHtmlSourceSpan.prototype)