import { DriveContacts } from "../src/drive-contacts";

describe('DriveContacts', () => {
    let input: string;
    let expectedRank: string;

    beforeEach(() => {
        input = 'Partner Chris\n' +
            'Partner Molly\n' +
            'Company Globex\n' +
            'Company ACME\n' +
            'Employee Laurie Globex\n' +
            'Company Hooli\n' +
            'Employee Abdi Hooli\n' +
            'Employee Jamie Globex\n' +
            'Contact Laurie Chris email\n' +
            'Contact Laurie Molly call\n' +
            'Partner Rezzan\n' +
            'Contact Abdi Molly email\n' +
            'Contact Laurie Chris coffee';
        expectedRank = 'ACME: No current relationship\n' +
            'Globex: Chris (2)\n' +
            'Hooli: Molly (1)'
    })

    describe('getCompanyContactRank', () => {
        it('Returns company contact rank', () => {
            let driveContacts = new DriveContacts(input);
            expect(driveContacts.getCompanyContactRank()).toBe(expectedRank);
        });

        it('ignores disallowed contact type', () => {
            input = input + '\nContact Laurie Chris movie';
            let driveContacts = new DriveContacts(input);
            expect(driveContacts.getCompanyContactRank()).toBe(expectedRank);
        });

        it('ignores duplicate company add', () => {
            input = input + '\nCompany Hooli';
            let driveContacts = new DriveContacts(input);
            expect(driveContacts.getCompanyContactRank()).toBe(expectedRank);
        });

        it('ignores duplicate employee add', () => {
            expectedRank = 'ACME: No current relationship\n' +
                'Globex: Chris (3)\n' +
                'Hooli: Molly (1)'
            input = input + '\nEmployee Laurie Betco\nContact Laurie Chris coffee';
            let driveContacts = new DriveContacts(input);
            expect(driveContacts.getCompanyContactRank()).toBe(expectedRank);
        });
    })
})
