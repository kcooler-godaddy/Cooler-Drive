export enum CommandTypes {
    employee = 'Employee',
    company = 'Company',
    contact = 'Contact',
    partner = 'Partner',
}

export enum ContactTypes {
    call = 'call',
    coffee = 'coffee',
    email = 'email'
}

export interface Partner {
}

export interface Employee {
    companyId: string;
}

export interface CompanyPartner {
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
