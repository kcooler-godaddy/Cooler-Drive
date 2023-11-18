import {getCompanyContactRank} from "../get-company-contact-rank";

const input = 'Partner Chris\n' +
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

const expectedRank = 'ACME: No current relationship\n' +
    'Globex: Chris (2)\n' +
    'Hooli: Molly (1)'

it('Returns company contact rank', () => {
    expect(getCompanyContactRank(input)).toBe(expectedRank);
});