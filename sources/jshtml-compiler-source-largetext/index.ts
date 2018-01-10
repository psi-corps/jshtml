import {JsHtmlSource, JsHtmlSourceLineCollection} from '../jshtml-abstractions'


class JsHtmlLargetTextSource extends JsHtmlSource {
    private readonly _chuncks: string[]
    private readonly _maxChunckLength: number
    private readonly _lines: JsHtmlSourceLineCollection
    private readonly _length: number
    
    private _checksum: Int8Array


    constructor()

    encoding: string;
    path: string;
    length: number;
    checksum: Int8Array;
    checksumAlgorithm: string;
    charAt(index: number): string {
        throw new Error("Method not implemented.");
    }

}


Object.freeze(JsHtmlLargetTextSource)
Object.freeze(JsHtmlLargetTextSource.prototype)

export default(JsHtmlLargetTextSource)

namespace Microsoft.AspNetCore.Razor.Language
{
    internal class LargeTextSourceDocument : RazorSourceDocument
    {
        public LargeTextSourceDocument(StreamReader reader, int chunkMaxLength, Encoding encoding, string fileName)
        {
            if (reader == null)
            {
                throw new ArgumentNullException(nameof(reader));
            }

            if (encoding == null)
            {
                throw new ArgumentNullException(nameof(encoding));
            }

            _chunkMaxLength = chunkMaxLength;
            Encoding = encoding;
            FilePath = fileName;

            ReadChunks(reader, _chunkMaxLength, out _length, out _chunks);
            _lines = new DefaultRazorSourceLineCollection(this);
        }

        public override char this[int position]
        {
            get
            {
                var chunkIndex = position / _chunkMaxLength;
                var insideChunkPosition = position % _chunkMaxLength;

                return _chunks[chunkIndex][insideChunkPosition];
            }
        }

        public override Encoding Encoding { get; }

        public override string FilePath { get; }

        public override int Length => _length;

        public override RazorSourceLineCollection Lines => _lines;

        public override void CopyTo(int sourceIndex, char[] destination, int destinationIndex, int count)
        {
            if (destination == null)
            {
                throw new ArgumentNullException(nameof(destination));
            }

            if (sourceIndex < 0)
            {
                throw new ArgumentOutOfRangeException(nameof(sourceIndex));
            }

            if (destinationIndex < 0)
            {
                throw new ArgumentOutOfRangeException(nameof(destinationIndex));
            }

            if (count < 0 || count > Length - sourceIndex || count > destination.Length - destinationIndex)
            {
                throw new ArgumentOutOfRangeException(nameof(count));
            }

            if (count == 0)
            {
                return;
            }

            var chunkIndex = sourceIndex / _chunkMaxLength;
            var insideChunkPosition = sourceIndex % _chunkMaxLength;
            var remaining = count;
            var currentDestIndex = destinationIndex;

            while (remaining > 0)
            {
                var toCopy = Math.Min(remaining, _chunkMaxLength - insideChunkPosition);
                Array.Copy(_chunks[chunkIndex], insideChunkPosition, destination, currentDestIndex, toCopy);

                remaining -= toCopy;
                currentDestIndex += toCopy;
                chunkIndex++;
                insideChunkPosition = 0;
            }
        }

        public override byte[] GetChecksum()
        {
            if (_checksum == null)
            {
                var charBuffer = new char[Length];
                CopyTo(0, charBuffer, 0, Length);

                var encoder = Encoding.GetEncoder();
                var byteCount = encoder.GetByteCount(charBuffer, 0, charBuffer.Length, flush: true);
                var bytes = new byte[byteCount];
                encoder.GetBytes(charBuffer, 0, charBuffer.Length, bytes, 0, flush: true);

                using (var hashAlgorithm = SHA1.Create())
                {
                    _checksum = hashAlgorithm.ComputeHash(bytes);
                }
            }

            var copiedChecksum = new byte[_checksum.Length];
            _checksum.CopyTo(copiedChecksum, 0);

            return copiedChecksum;
        }

        private static void ReadChunks(StreamReader reader, int chunkMaxLength, out int length, out List<char[]> chunks)
        {
            length = 0;
            chunks = new List<char[]>();

            int read;
            do
            {
                var chunk = new char[chunkMaxLength];
                read = reader.ReadBlock(chunk, 0, chunkMaxLength);

                length += read;

                if (read > 0)
                {
                    chunks.Add(chunk);
                }
            }
            while (read == chunkMaxLength);
        }
    }
}
