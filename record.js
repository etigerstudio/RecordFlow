let crypto = require('crypto');

class RecordItem {
    constructor(name, value) {
        this._name = name;
        this._value = value;
    }

    toString() {
        return `rf.record_item: {${this._item_to_string()}}`;
    }
    
    _item_to_string() {
        if (typeof this._value === 'string') {
            return `${this._name}: '${this._value}'`;
        } else if (typeof this._value === 'number') {
            return `${this._name}: ${this._value}`;
        }
    }
}

class Record {
    constructor() {
        this._id = crypto.randomBytes(20).toString('hex');
        //fixme: array performance penalty.
        this._items = [];
    }

    append(item) {
        this._items.push(item);
    }

    appendItems(item) {
        this._items.push(...item);
    }

    retrieve(name) {
        let item = this._items.filter(item => item._name === name);
        if (item.length > 0) {
            return item[0]._value;
        } else {
            return undefined;
        }
    }

    toString() {
        return `rf.record: ${this._items.length} items. {${this._items_to_string()}, _id: ...${this._id.substr(36)}}`;
    }

    _items_to_string() {
        return this._items.reduce((str, item) => {
            if (str.length === 0) {
                return str.concat(`${item._item_to_string()}`)
            } else {
                return str.concat(`, ${item._item_to_string()}`)
            }
        }, '')
    };
}

module.exports = {record: Record, record_item: RecordItem};