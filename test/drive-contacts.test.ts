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
    });

    describe('getCompanyContactRank', () => {
        it('Returns company contact rank in alphabetical order', () => {
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

        it('ignores employee add if name already in use', () => {
            expectedRank = 'ACME: No current relationship\n' +
                'Betco: No current relationship\n' +
                'Globex: Chris (3)\n' +
                'Hooli: Molly (1)'
            input = input + '\nCompany Betco\nEmployee Laurie Betco\nContact Laurie Chris coffee';
            let driveContacts = new DriveContacts(input);
            expect(driveContacts.getCompanyContactRank()).toBe(expectedRank);
        });

        it('ignores contact add if employee does not exist', () => {
            input = input + '\nContact Kevin Chris coffee';
            let driveContacts = new DriveContacts(input);
            expect(driveContacts.getCompanyContactRank()).toBe(expectedRank);
        });

        it('ignores contact add if partner does not exist', () => {
            input = input + '\nContact Laurie Kevin coffee';
            let driveContacts = new DriveContacts(input);
            expect(driveContacts.getCompanyContactRank()).toBe(expectedRank);
        });
    })
})
