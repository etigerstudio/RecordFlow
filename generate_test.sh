cd tests
node test_basic.js

jison ../jison/recordflow.jison -o recordflow.js
node ../recordflow.js test_statement
node test_parser.js
node test_persistence.js