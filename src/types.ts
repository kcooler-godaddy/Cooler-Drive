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
    call = 'call',
    coffee = 'coffee',
    email = 'email'
}

export interface Partner {
}

export interface Employee {
    companyId: string;
}

interface CompanyPartner {
    employeeContacts: string[];
    contactCount: number;
}

export interface Company {
    partners: Record<string, CompanyPartner>
    topPartner?: {
        partnerId: string;
        contactCount: number;
    }
}

