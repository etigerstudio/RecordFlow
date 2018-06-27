constant = require('./constant');

class Collection {
    constructor(name) {
        this._name = name;
        this._records = [];
    }

    record(filter) {
        return filter(this._records);
    }

    append(record) {
        // fixme: duplicate record.
        this._records.push(record);
    }

    toString() {
        return `rf.collection:  ${this._records.length} records. {name: ${this._name}}`;
    }
}

class WareHouse {
    constructor() {
        this._collections = [];
    }

    collection(name) {
        // fixme: array performance penalty.
        let col = this._collections.filter(col => col.name === name);
        if (col.length > 0) {
            return col;
        } else {
            col = new Collection(name);
            this._collections.push(col);
            return col;
        }
    }

    toString() {
        return `rf: ${this._collections.length} collections. {version: ${constant.version}}`;
    }
}

let warehouse = new WareHouse();
module.exports = warehouse;