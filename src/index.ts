#!/usr/bin/env npx ts-node --esm
import fs from 'fs';
import { DriveContacts } from "./drive-contacts.js";

if (process.argv.length < 3) {
    console.log('Usage: node dist/index.js <path_to_input_file>');
    process.exit(1);
}
const filename = process.argv[2];

fs.readFile(filename, 'utf8', (err, data) => {
    if (err) throw err;
    const driveContacts = new DriveContacts(data);
    console.log(driveContacts.getCompanyContactRank());
});
