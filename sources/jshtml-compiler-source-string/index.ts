import {JsHtmlSource, JsHtmlSourceLineCollection} from "../jshtml-abstractions";


class JsHtmlStringSource extends JsHtmlSource {
    private readonly _checksum: Int8Array


    constructor(
        private readonly _content: string,
        private readonly _key: string,
        public readonly encoding: string) {
        super()
        this.lines = new JsHtmlSourceLineCollection(this)
        this.path = null
        this.checksumAlgorithm = null
    }

    
    lines: any
    path: string
    checksumAlgorithm: string

    get length(): number {
        return this._content.length;
    }
    
    get checksum(): Int8Array {
        if (!this._checksum) {
            // var charBuffer = _content.ToCharArray();
            // var encoder = Encoding.GetEncoder();
            // var byteCount = encoder.GetByteCount(charBuffer, 0, charBuffer.Length, flush: true);
            // var bytes = new byte[byteCount];
            // encoder.GetBytes(charBuffer, 0, charBuffer.Length, bytes, 0, flush: true);

            // using (var hashAlgorithm = SHA1.Create())
            // {
            //     _checksum = hashAlgorithm.ComputeHash(bytes);
            // }
        }


        // var copiedChecksum = new byte[_checksum.Length];
        // _checksum.CopyTo(copiedChecksum, 0);

        //return copiedChecksum;
        return new Int8Array(0);
    }

    
    charAt(index: number): string {
        return this._content.charAt(index)
    }
}


Object.freeze(JsHtmlSource)
Object.freeze(JsHtmlSource.prototype)

export default JsHtmlStringSource