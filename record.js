crypto = require('crypto');

class RecordItem {
    constructor(name, value) {
        this._name = name;
        this._value = value;
    }

    toString() {
        return `rf.record_item:  {${this._name}: ${this._value}}`;
    }
}

class Record {
    constructor() {
        this._id = crypto.randomBytes(20).toString('hex');
        this._items = [];
    }

    append(item) {
        //fixme: array performance penalty.
        this._items.push(item);
    }

    toString() {
        //fixme: refine items spread.
        return `rf.record:  ${this._items.length} items. {id: ${this._id}, ${JSON.stringify(this._items)}}`;
    }
}

module.exports = {record: Record, record_item: RecordItem};