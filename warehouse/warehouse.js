const constant = require('../common/constant');
let config = require('../common/config');
const record_map = require('./recordmap');
const fs = require('fs');
const path = require('path');
const {record, record_item} = require('./record');

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

    static fromJSON(json) {
        let col = new Collection(json['_name']);
        for (let rec of json['_records']) {
            let rec_new = new record(rec._id);
            for (let item of rec['_items']) {
                let item_new = new record_item(item['_name'], item['_value']);
                rec_new.append(item_new);
            }
            col.append(rec_new);
        }
        return col;
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

    save() {
        if (!fs.existsSync(config.dir)) {
            fs.mkdirSync(config.dir);
        }

        for (let col of this._collections) {
            fs.writeFileSync(config.dir + col._name + '.rfrec', JSON.stringify(col));
        }

        this._after_save(this._collections.length);
    }

    _after_save(count) {
        if(config.interactive) {
            console.log(`rf.save: ${count} collections saved to ${path.resolve(config.dir)}.\n`);
        }
    }

    load() {
        if (!fs.existsSync(config.dir)) {
            this._after_load(0);
            return;
        }

        let count = 0;
        let dir = fs.readdirSync(config.dir);
        dir.forEach(item => {
            let stats = fs.statSync(config.dir + item);
            if (stats.isFile()) {
                this._collections.push(Collection.fromJSON(JSON.parse(fs.readFileSync(config.dir + item))));
                ++count;
            }
        });
        this._after_load(count);
    }

    _after_load(count) {
        if(config.interactive) {
            console.log(`rf.load: ${count} collections loaded.\n`);
        }
    }

    clear() {
        this._collections = [];
    }

    toString() {
        return `rf: ${this._collections.length} collections. {version: ${constant.version}}`;
    }
}

let warehouse = new WareHouse();
module.exports = warehouse;