class KeyTransform {
    constructor(toKey, toFileName) {
        this._ = {};
        if (!((this._.toKey = toKey) instanceof Function)) throw new Error();
        if (!((this._.toFileName = toFileName) instanceof Function)) throw new Error();
    }


    toKey(fileName) {
        return this._.toKey(fileName);
    }

    toFileName(key) {
        return this._.toFileName(key);
    }
}


KeyTransform.DEFAULT = new KeyTransform(k => k.replace(path.SEPARATOR, '-'), f => f.replace('-', path.SEPARATOR));


Object.freeze(KeyTransform);
Object.freeze(KeyTransform.prototype);


export default KeyTransform