import {CommandTypes, Company, ContactTypes, Employee, Partner} from "./types.js";

const partners: Record<string, Partner> = {}
const employees: Record<string, Employee> = {}
const companies: Record<string, Company> = {}

const allowedContactTypes = [ContactTypes.call, ContactTypes.coffee, ContactTypes.email]

export function getCompanyContactRank(data: string): string {
    const commands = data.split('\n');
    commands.forEach((command) => {
        const parts = command.split(' ');
        const type = parts[0]
        switch (type) {
            case CommandTypes.partner:
                const partnerId = parts[1]
                partners[partnerId] = {
                    employeeContacts: {}
                };
                break;
            case CommandTypes.company:
                const companyId = parts[1];
                companies[companyId] = { partners: {} };
                break;
            case CommandTypes.employee:
                const employeeId = parts[1];
                const employeeCompanyId = parts[2];
                employees[employeeId] = { companyId: employeeCompanyId }
                break;
            case CommandTypes.contact:
                const contactEmployeeId = parts[1];
                const contactPartnerId = parts[2];
                const contactType = parts[3];
                if (!allowedContactTypes.includes(contactType.toLowerCase() as ContactTypes)) break;
                const contactCompanyId = employees[contactEmployeeId].companyId;
                const contactCompany = companies[contactCompanyId];

                if (!contactCompany.partners[contactPartnerId]) {
                    contactCompany.partners[contactPartnerId] = {
                        employeeContacts: [contactEmployeeId],
                        contactCount: 1
                    }
                } else {
                    contactCompany.partners[contactPartnerId].employeeContacts.push(contactEmployeeId);
                    contactCompany.partners[contactPartnerId].contactCount = contactCompany.partners[contactPartnerId].contactCount + 1;
                }
                if (!contactCompany.topPartner || contactCompany.partners[contactPartnerId].contactCount > contactCompany.topPartner.contactCount) {
                    contactCompany.topPartner = {
                        partnerId: contactPartnerId,
                        contactCount: contactCompany.partners[contactPartnerId].contactCount
                    }
                }
                break;
        }
    });
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