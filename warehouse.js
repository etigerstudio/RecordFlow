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
            console.log(`rf.record has been successfully inserted.\n${record.toString()}\n${this.toString()}`);
        }
    }

    /*updateRecords(records) {
        for (update_rec of records) {
            // fixme: potential new record
            for (i = 0; i < records.length; ++index) {
                if (this._records[i]._id === update_rec._id) {
                    this._records[i]
                }
            }
        }
    }*/

    getRecordById(id) {
        for (let rec of this._records) {
            if (rec._id === id) {
                return rec;
            }
        }
    }

    toString() {
        return `rf.collection: ${this._records.length} records. {name: ${this._name}}`;
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