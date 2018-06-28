node test_basic.js

jison ../parser/recordflow.jison -o ../parser/rf_parser.js
node rf_parser.js test_statement
node test_parser.js
node test_persistence.js