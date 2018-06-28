const constant = require('./constant');
let config = require('./config');
const record_map = require('./recordmap');

class Collection {
    constructor(name) {
        this._name = name;
        this._records = [];
    }

    record(filter) {
        return new record_map(this, filter(this._records));
    }

    append(record) {
        // fixme: duplicate record.
        this._records.push(record);
        this._after_append(record);
    }

    _after_append(record) {
        if(config.interactive) {
            console.log(`rf.record.insert: record with ${record.getItemCount()} items inserted. \n${record.getContent()}\n`);
        }
    }

    dropAll() {
        let count = this._records.length;
        this._records = [];
        this._after_drop_all(count);
    }

    _after_drop_all(count) {
        if(config.interactive) {
            console.log(`rf.collection.drop_all: ${count} records dropped.\n`);
        }
    }

    getRecordById(id) {
        for (let rec of this._records) {
            if (rec._id === id) {
                return rec;
            }
        }
    }

    dropRecordById(id) {
        for (let i = 0; i < this._records.length; i++) {
            if (this._records[i]._id === id) {
                this._records.splice(i, 1);
            }
        }
    }

    toString() {
        return `rf.collection: ${this._records.length} records in collection '${this._name}'.\n`;
    }

    log() {
        console.log(this.toString());
    }
}

class WareHouse {
    constructor() {
        this._collections = [];
    }

    collection(name) {
        // fixme: array performance penalty.
        let col = this._collections.filter(col => col._name === name);
        if (col.length > 0) {
            return col[0];
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