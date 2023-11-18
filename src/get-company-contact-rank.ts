import {CommandTypes, Company, ContactTypes, Employee, Partner} from "./types";

const partners: Record<string, Partner> = {}
const employees: Record<string, Employee> = {}
const companies: Record<string, Company> = {}

const allowedContactTypes = [ContactTypes.call, ContactTypes.coffee, ContactTypes.email]

function addPartner(partnerId: string) {
    partners[partnerId] = {
        employeeContacts: {}
    };
}
function addCompany(companyId: string) {
    companies[companyId] = { partners: {} };
}
function addEmployee(employeeId: string, employeeCompanyId: string) {
    employees[employeeId] = { companyId: employeeCompanyId }
}
function addContactToCompany(companyId: string, employeeId: string, partnerId: string) {
    const company = companies[companyId];

    if (!company.partners[partnerId]) {
        company.partners[partnerId] = {
            employeeContacts: [employeeId],
            contactCount: 1
        }
    } else {
        company.partners[partnerId].employeeContacts.push(employeeId);
        company.partners[partnerId].contactCount = company.partners[partnerId].contactCount + 1;
    }
    if (!company.topPartner || company.partners[partnerId].contactCount > company.topPartner.contactCount) {
        company.topPartner = {
            partnerId: partnerId,
            contactCount: company.partners[partnerId].contactCount
        }
    }
}
function addContact(employeeId: string, partnerId: string, contactType: ContactTypes) {
    if (!allowedContactTypes.includes(contactType)) return;
    const companyId = employees[employeeId].companyId;
    addContactToCompany(companyId, employeeId, partnerId);
}

function initializeRecordsFromCommands(commandsString: string) {
    const commands = commandsString.split('\n');
    commands.forEach((command) => {
        const parts = command.split(' ');
        const commandType = parts[0]
        switch (commandType) {
            case CommandTypes.partner:
                const partnerId = parts[1]
                addPartner(partnerId);
                break;
            case CommandTypes.company:
                const companyId = parts[1];
                addCompany(companyId);
                break;
            case CommandTypes.employee:
                const employeeId = parts[1];
                const employeeCompanyId = parts[2];
                addEmployee(employeeId, employeeCompanyId);
                break;
            case CommandTypes.contact:
                const contactEmployeeId = parts[1];
                const contactPartnerId = parts[2];
                const contactType = parts[3];
                addContact(contactEmployeeId, contactPartnerId, contactType.toLowerCase() as ContactTypes);
                break;
        }
    });
}

export function getCompanyContactRank(data: string): string {
    initializeRecordsFromCommands(data);
    const companyNames = Object.keys(companies);
    const topCompanyPartners: string[] = []
    companyNames.sort().forEach((companyName) => {
        const { topPartner } = companies[companyName];
        if (!topPartner) {
            topCompanyPartners.push(`${companyName}: No current relationship`)
        } else {
            topCompanyPartners.push(`${companyName}: ${topPartner.partnerId} (${topPartner.contactCount})`)
        }
    });
    return topCompanyPartners.join('\n');
}