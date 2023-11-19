#!/usr/bin/env npx ts-node --esm
import fs from 'fs';
import { DriveContacts } from "./drive-contacts";

if (process.argv.length < 3) {
    console.log('Please provide an input text file of commands: \n npm run start <path_to_input_file>');
    process.exit(1);
}
const filename = process.argv[2];

fs.readFile(filename, 'utf8', (err, data) => {
    if (err) throw err;
    const driveContacts = new DriveContacts(data);
    console.log(driveContacts.getCompanyContactRank());
});
