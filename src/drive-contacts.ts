import {Command, ContactScore, ContactType, Company, Employee, Partner, PartnerContact} from "./types";

export class DriveContacts {
    private partners: Record<string, Partner> = {};
    private employees: Record<string, Employee> = {};
    private companies: Record<string, Company> = {};
    private allowedContactTypes = [ContactType.call, ContactType.coffee, ContactType.email, ContactType.pitch];

    constructor(commandsString: string) {
        const commands = commandsString.split('\n');
        commands.forEach((command) => {
            const parts = command.split(' ');
            const commandType = parts[0];
            switch (commandType) {
                case Command.partner:
                    const partnerId = parts[1];
                    this.addPartner(partnerId);
                    break;
                case Command.company:
                    const companyId = parts[1];
                    this.addCompany(companyId);
                    break;
                case Command.employee:
                    const employeeId = parts[1];
                    const employeeCompanyId = parts[2];
                    this.addEmployee(employeeId, employeeCompanyId);
                    break;
                case Command.contact:
                    const contactEmployeeId = parts[1];
                    const contactPartnerId = parts[2];
                    const contactType = parts[3];
                    this.addContact(contactEmployeeId, contactPartnerId, contactType.toLowerCase() as ContactType);
                    break;
            }
        });
    }

    getCompanyContactRank(): string {
        const companyNames = Object.keys(this.companies);
        const topCompanyPartners: string[] = [];
        companyNames.sort().forEach((companyName) => {
            const { topPartner } = this.companies[companyName];
            if (!topPartner) {
                topCompanyPartners.push(`${companyName}: No current relationship`);
            } else {
                topCompanyPartners.push(`${companyName}: ${topPartner.partnerId} (${topPartner.contactScore})`);
            }
        });
        return topCompanyPartners.join('\n');
    }

    private addPartner(partnerId: string) {
        if (this.partners[partnerId]) return;
        this.partners[partnerId] = {};
    }

    private addCompany(companyId: string) {
        if (this.companies[companyId]) return;
        this.companies[companyId] = { partners: {} };
    }

    private addEmployee(employeeId: string, companyId: string) {
        if (this.employees[employeeId]) return;
        this.employees[employeeId] = { companyId };
    }

    private addContactToCompany(companyId: string, employeeId: string, partnerId: string, contactType: ContactType) {
        const company = this.companies[companyId];
        if (!company) return;

        const employeeContact: PartnerContact = { employeeId, contactType };
        if (!company.partners[partnerId]) {
            company.partners[partnerId] = {
                employeeContacts: [employeeContact],
                contactScore: ContactScore[contactType]
            };
        } else {
            company.partners[partnerId].employeeContacts.push(employeeContact);
            company.partners[partnerId].contactScore += ContactScore[contactType];
        }
        if (!company.topPartner || company.partners[partnerId].contactScore > company.topPartner.contactScore) {
            company.topPartner = {
                partnerId: partnerId,
                contactScore: company.partners[partnerId].contactScore
            };
        }
    }

    private addContact(employeeId: string, partnerId: string, contactType: ContactType) {
        if (
            !this.allowedContactTypes.includes(contactType) ||
            !this.employees[employeeId] ||
            !this.partners[partnerId]
        ) return;
        const companyId = this.employees[employeeId].companyId;
        this.addContactToCompany(companyId, employeeId, partnerId, contactType);
    }
}



