#!/usr/bin/env npx ts-node --esm
import fs from 'fs';
import {getCompanyContactRank} from "./get-company-contact-rank.js";

if (process.argv.length < 3) {
    console.log('Usage: node dist/index.js <path_to_input_file>');
    process.exit(1);
}
const filename = process.argv[2];
console.log('Received input file: ', filename);

fs.readFile(filename, 'utf8', (err, data) => {
    if (err) throw err;
    console.log(getCompanyContactRank(data));
});
