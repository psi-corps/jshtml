export default interface IJsHtmlSource {
    readonly encoding: string
    readonly path: string
    readonly length: number
    readonly checksum: Int8Array
    readonly checksumAlgorithm: string

    charAt(index: number): string;
}