
class Filter {
    static all() {
        return rec => rec;
    }

    static equal(name, value) {
        return rec => {
            return rec.filter(rec => rec.retrieve(name) === value);
        }
    }

    static gt(name, value) {
        return rec => {
            return rec.filter(rec => rec.retrieve(name) > value);
        }
    }

    static lt(name, value) {
        return rec => {
            return rec.filter(rec => rec.retrieve(name) < value);
        }
    }
}

module.exports = Filter;