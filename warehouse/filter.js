
class Filter {
    static cut(records) {
        return records.map(rec => rec._id);
    }

    static all() {
        return rec => this.cut(rec);
    }

    static equal(name, value) {
        return rec => {
            return this.cut(rec.filter(rec => rec.retrieve(name) === value));
        }
    }

    static gt(name, value) {
        return rec => {
            return this.cut(rec.filter(rec => rec.retrieve(name) > value));
        }
    }

    static lt(name, value) {
        return rec => {
            return this.cut(rec.filter(rec => rec.retrieve(name) < value));
        }
    }
}

module.exports = Filter;