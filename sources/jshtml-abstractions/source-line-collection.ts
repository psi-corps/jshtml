import IJsHtmlSource from "./source";

class JsHtmlSourceLineCollection {
    private readonly _source: IJsHtmlSource
    private readonly _lineStarts: number[]


    constructor(source: IJsHtmlSource) {
        this._source = source;
        this._lineStarts = this.getLineStarts();
    }


    get count(): number { return this._lineStarts.length; }

    
    lineLength(index: number): number {
        if (index < 0 || index >= this._lineStarts.length) {
            throw new Error('index')
        }
        if (index == this._lineStarts.length - 1) {
            return this._source.length - this._lineStarts[index]
        }

        return this._lineStarts[index + 1] - this._lineStarts[index]
    }

    location(position: number): JsHtmlSourceLocation {
        if (position < 0 || position >= this._source.length) {
            throw new Error('positoion')
        }

        let index = this._lineStarts.indexOf(position)

        if (index >= 0) return new JsHtmlSourceLocation(this._source.path, position, index, 0)

        index = (~index) - 1

        if (index == -1) {
            return new JsHtmlSourceLocation(this._source.path, position, 0, position)
        } else {
            const characterIndex = position - this._lineStarts[index]
            return new JsHtmlSourceLocation(this._source.path, position, index, characterIndex)
        }
    }


    private getLineStarts(): number[] {
        let unprocessedCR = false
        const starts = Array<number>(0)
        starts.push(0)

        for (let i = 0; i < this._source.length; ++i) {
            const chr = this._source.charAt(i);
            
            let isLineBreak = false

            switch (chr) {
                case '\r':
                    unprocessedCR = true
                    continue
                case '\n':
                    unprocessedCR = false
                    isLineBreak = true
                    continue
                case '\u0085':
                case '\u2028':
                case '\u2029':
                    isLineBreak = true
                    break
            }

            if (unprocessedCR)
            {
                starts.push(i)
                unprocessedCR = false
            }
            if (isLineBreak)
            {
                starts.push(i + 1)
            }
        }

        return starts
    }
}


Object.freeze(JsHtmlSourceLineCollection)
Object.freeze(JsHtmlSourceLineCollection.prototype)

export default JsHtmlSourceLineCollection