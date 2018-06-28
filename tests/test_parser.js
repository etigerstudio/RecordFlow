let parser = require('../parser/rf_parser').parser;

parser.parse(`
# insert
default <- {price: 800, model: 'A1238P'}
default <- {price: 600, name: 'Camery'}
default <- {price: 650}
default <- {price: 1000, name: 'Odyssey', model: 'AN938P'}

# query
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
# insert
default <- {price: 800, model: 'A1238P'}
default <- {price: 600, name: 'Camery'}
default <- {price: 650}
default <- {price: 1000, name: 'Odyssey', model: 'AN938P'}

# query
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