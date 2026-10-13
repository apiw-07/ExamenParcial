const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
// Register only the local TypeScript modules needed for pure domain checks.
require.extensions['.ts'] = function(module, filename) {
 const source = fs.readFileSync(filename, 'utf8');
 module._compile(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 }}).outputText, filename);
};
const { summarizeInventory } = require('../src/app/bookstores/domain/model/store-inventory.ts');
const { validCopies } = require('../src/app/inventory/domain/model/receipt-policy.ts');
const { BookAssembler } = require('../src/app/catalog/infrastructure/book-assembler.ts');
const data = JSON.parse(fs.readFileSync('server/db.json', 'utf8'));
const store = { id: 1, name: 'Test', specialty: 'fantasy', minimumCopies: 6 };
const batches = [
 { bookstoreId: 1, bookKey: 'a', bookTitle: 'A', copies: 2 },
 { bookstoreId: 1, bookKey: 'a', bookTitle: 'A', copies: 4 },
 { bookstoreId: 1, bookKey: 'b', bookTitle: 'B', copies: 3 },
 { bookstoreId: 2, bookKey: 'c', bookTitle: 'C', copies: 1 }
];
let summary = summarizeInventory(store, batches);
assert.equal(summary.availableTitles, 2);
assert.equal(summary.replenishmentRequired, 1);
assert.equal(summary.titles.find(t => t.bookKey === 'a').copies, 6);
summary = summarizeInventory({ ...store, id: 99 }, batches);
assert.deepEqual(summary.titles, []); assert.equal(summary.availableTitles, 0); assert.equal(summary.replenishmentRequired, 0);
for (const n of [1, 6, 12]) assert.equal(validCopies(n, 6), true);
for (const n of [0, -1, 1.5, 13, NaN, Infinity]) assert.equal(validCopies(n, 6), false);
const assembler = new BookAssembler();
assert.equal(assembler.toEntity({ key: 'a', title: 'A' }).authorName, 'Unknown Author');
assert.equal(assembler.toEntity({ key: 'a', title: 'A', authors: [] }).authorName, 'Unknown Author');
assert.equal(assembler.toEntity({ key: 'a', title: 'A', authors: [{ name: 'First' }, { name: 'Second' }] }).authorName, 'First');
assert.equal(new Set(data.bookstores.map(s => s.specialty)).size, 6);
console.log('PASS: duplicate title aggregation, threshold equality, empty stores, isolation, copy policy and author mapping.');
