export enum Action {
    init = 'init',
    exit = '0',
    companyPartnerRank = '1'
}

export enum Prompt {
    inputError = 'Please provide an input text file of commands: \n npm run start <path_to_input_file>',
    fileReadError = 'There was an error when trying to read your input file',
    main = `What would you like to do?
        - [${Action.exit}] Exit
        - [${Action.companyPartnerRank}] Generate a list of companies mapped to the top partner
        `,
    invalidOption = '\nPlease select an option from the list\n',
    userInput = ' >> '
}

export enum Command {
    employee = 'Employee',
    company = 'Company',
    contact = 'Contact',
    partner = 'Partner',
}

export enum ContactType {
    coffee = 'coffee',
    call = 'call',
    email = 'email',
    pitch = 'pitch'
}

export const ContactScore = {
    [ContactType.call]: 2,
    [ContactType.coffee]: 3,
    [ContactType.email]: 1,
    [ContactType.pitch]: 5
}

export interface Partner {
}

export interface Employee {
    companyId: string;
}

export interface PartnerContact {
    employeeId: string;
    contactType: ContactType;
}

interface CompanyPartner {
    employeeContacts: PartnerContact[];
    contactScore: number;
}

export interface Company {
    partners: Record<string, CompanyPartner>
    topPartner?: {
        partnerId: string;
        contactScore: number;
    }
}

