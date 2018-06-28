const warehouse = require('../warehouse/warehouse');
const filter = require('../warehouse/filter');
const {record, record_item} = require('../warehouse/record');

console.log('------rf.test: init------');
let col = warehouse.collection('default');
console.log(warehouse.collection('default').toString());

let rec1 = record.build();
rec1.appendItems([new record_item('price', 800),new record_item('model', 'A1238P')]);
let rec2 = record.build();
rec2.appendItems([new record_item('price', 600), new record_item('name', 'Camery')]);
let rec3 = record.build();
rec3.appendItems([new record_item('price', 650)]);
let rec4 = record.build();
rec4.appendItems([new record_item('price', 1000), new record_item('name', 'Odyssey'), new record_item('model', 'AN938P')]);

console.log('------rf.test: insert------');
warehouse.collection('default').append(rec1);
warehouse.collection('default').append(rec2);
warehouse.collection('default').append(rec3);
warehouse.collection('default').append(rec4);

console.log('------rf.test: filter------');
let all_rec = warehouse.collection('default').record(filter.all());
console.log(all_rec.toString());
let equal_rec = warehouse.collection('default').record(filter.equal('name', 'Odyssey'));
console.log(equal_rec.toString());
let gt_rec = warehouse.collection('default').record(filter.gt('price', 600));
console.log(gt_rec.toString());

// update & drop not implemented yet.