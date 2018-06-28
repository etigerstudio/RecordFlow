const record_map = require('./recordmap');
const record = require('./record').record;

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

    toString() {
        return record.recordSetToString(this._record_ids.map(id => this._collection.getRecordById(id)));
    }
}

module.exports = RecordMap;