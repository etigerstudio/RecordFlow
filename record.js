const crypto = require('crypto');

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
    constructor(id) {
        this._id = id;
        //fixme: array performance penalty.
        this._items = [];
    }

    static build() {
        return new Record(crypto.randomBytes(20).toString('hex'));
    }

    append(item) {
        this._items.push(item);
    }

    appendItems(item) {
        this._items.push(...item);
    }

    merge(record) {
        for (let merge_item of record._items) {
            // fixme: nm time complexity
            let existing = false;
            for (let item of this._items) {
                if (item._name === merge_item._name) {
                    item._value = merge_item._value;
                    existing = true;
                }
            }

            if (!existing) {
                this.append(merge_item);
            }
        }
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

    getItemCount() {
        return this._items.length;
    }

    getContent() {
        return '{' + this._items_to_string() + '}';
    }

    _items_to_string() {
        return this._items.reduce((str, item) => {
            if (str.length === 0) {
                return str.concat(`${item._item_to_string()}`);
            } else {
                return str.concat(`, ${item._item_to_string()}`);
            }
        }, '')
    }

    static recordSetToString(records) {
        return `rf.record_set: ${records.length} records in record_set.\n[` +
            records.reduce((str, rec) => {
                if (str.length === 0) {
                    return str.concat('{' + rec._items_to_string()) + ', _id: ...' + rec._id.substr(36) + '}';
                } else {
                    return str.concat(', {' + rec._items_to_string()) + ', _id: ...' + rec._id.substr(36) + '}';
                }
            }, '') + ']';
    }
}

module.exports = {record: Record, record_item: RecordItem};