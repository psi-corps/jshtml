import IJsHtmlSource from "./source";

export default abstract class JsHtmlSource implements IJsHtmlSource {
    static const LargeObjectHeapLimitInChars = 40 * 1024
    static readonly EmptyArray: IJsHtmlSource[] = Array<IJsHtmlSource>(0)

    abstract encoding: string
    abstract path: string
    abstract length: number
    abstract checksum: Int8Array
    abstract checksumAlgorithm: string

    abstract charAt(index: number): string

    //abstract readonly lines: JsHtmlSourceLinesCollection
}

        // public static RazorSourceDocument ReadFrom(Stream stream, string fileName)
        // {
        //     if (stream == null)
        //     {
        //         throw new ArgumentNullException(nameof(stream));
        //     }

        //     return new StreamSourceDocument(stream, encoding: null, fileName: fileName);
        // }

        // public static RazorSourceDocument ReadFrom(Stream stream, string fileName, Encoding encoding)
        // {
        //     if (stream == null)
        //     {
        //         throw new ArgumentNullException(nameof(stream));
        //     }

        //     if (encoding == null)
        //     {
        //         throw new ArgumentNullException(nameof(encoding));
        //     }

        //     return new StreamSourceDocument(stream, encoding, fileName);
        // }

        // public static RazorSourceDocument ReadFrom(RazorProjectItem projectItem)
        // {
        //     if (projectItem == null)
        //     {
        //         throw new ArgumentNullException(nameof(projectItem));
        //     }

        //     var path = projectItem.PhysicalPath;
        //     if (string.IsNullOrEmpty(path))
        //     {
        //         path = projectItem.FilePath;
        //     }

        //     using (var inputStream = projectItem.Read())
        //     {
        //         return ReadFrom(inputStream, path);
        //     }
        // }
    }
}
