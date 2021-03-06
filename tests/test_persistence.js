let parser = require('../parser/rf_parser').parser;
const warehouse = require('../warehouse/warehouse');

parser.parse(`
# insert
default <- {price: 800, model: 'A1238P'}
default <- {price: 600, name: 'Camery'}
default <- {price: 650}
default <- {price: 1000, name: 'Odyssey', model: 'AN938P'}
`);

warehouse.save();

warehouse.clear();

warehouse.load();

parser.parse(`# query
default
default -> {:all}
default -> {name = 'Odyssey'}
default -> {price > 700}

# update
default -> {:all}
default -> {price > 600} <- {quality: 'high'}
default -> {:all}
default -> {name = 'Odyssey'} <- {price: 700}
default -> {:all}

# drop
default -> {model = 'A1238P'} ->
default -> {:all}
default -> {price < 700} ->
default -> {:all}
default ->
`);