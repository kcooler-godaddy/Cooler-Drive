#!/usr/bin/env npx ts-node --esm
import fs from 'fs';
import promptSync from 'prompt-sync';
import {DriveContacts} from "./drive-contacts";
import {Action, Prompt} from "./types";

const prompt = promptSync();

if (process.argv.length < 3) {
    console.log(Prompt.inputError);
    process.exit(1);
}
const filename = process.argv[2];

fs.readFile(filename, 'utf8', (err, data) => {
    if (err) {
        console.log(Prompt.fileReadError);
    }

    const driveContacts = new DriveContacts(data);

    const validActions = [Action.exit, Action.companyPartnerRank];
    let action = Action.init;

    while(action !== Action.exit) {
        console.log(Prompt.main);
        action = prompt(Prompt.userInput) as Action;

        if (!validActions.includes(action)) {
            console.log(Prompt.invalidOption);
            action = prompt(Prompt.userInput) as Action;
        }

        switch (action) {
            case Action.exit:
                break;
            case Action.companyPartnerRank:
                console.log('\n-------------------------------------');
                console.log('\n', driveContacts.getCompanyContactRank());
                console.log('\n-------------------------------------\n');
        }
    }
});
