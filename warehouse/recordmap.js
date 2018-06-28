const record = require('./record').record;
let config = require('../common/config');

class RecordMap {
    constructor(collection, records) {
        this._collection = collection;
        this._record_ids = records;
    }

    merge(record) {
        for (let id of this._record_ids) {
            let rec = this._collection.getRecordById(id);
            rec.merge(record);
        }
    }

    record(filter) {
        return new record_map(this._collection, filter(this._records));
    }

    drop() {
        this._record_ids.forEach(id => this._collection.dropRecordById(id));
        this._after_drop();
    }

    _after_drop() {
        if(config.interactive) {
            console.log(`rf.record_set.drop: ${this._record_ids.length} records dropped.\n`);
        }
    }

    toString() {
        return record.recordSetToString(this._record_ids.map(id => this._collection.getRecordById(id))) + '\n';
    }

    log() {
        console.log(this.toString());
    }
}

module.exports = RecordMap;