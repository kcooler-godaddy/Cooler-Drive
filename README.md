# Cooler-Drive

A tool to build and analyze an interpersonal network

This app processes a list of commands from a text file formatted like 
- `Partner <Name>`
- `Company <Name>`
- `Employee <Name> <CompanyName>`
- `Contact <EmployeeName> <PartnerName> <ContactType: [email|call|coffee]>`

Current available features:
1. **Generate a list of companies mapped to the top partner.** The output is a list of all companies, sorted alphabetically, mapped to the Partner with the strongest
relationship to it and the partner's relationship strength to that company.

## Setup the app from project root

### Prerequisites
- NVM

Install [NVM] to manage Node versions.
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```
Run the following commands to install the node version specified in the .nvmrc and complete setup of the project

```bash
nvm use

npm install

npm run build
```

## Run the app with an <input_file> 

```bash
npm run start <input_file>
```
Then follow the instructions in the CLI

## Run tests

```bash
npm run test
```

## Problem approach and design decisions

I think the easiest way to describe this process is to walk through each commit.
1. **Initial Commit** - Created a repo in github to manage code changes (helpful when there is a 2-month-old baby in the house that could need attention at any time) and make the project sharable.
2. **Setup node app with typescript** - I chose these for two reasons. First, it is the tech that I work with on a daily basis. Second, I have never set up a typescript node project from scratch before and I figured it would be an interesting experience to see how all the configurations were created (it turned out to be more challenging that I hoped to get everything to transpile nicely). I prefer typscript over javascript - I think the typing makes the code more legible and prevents a lot of bugs before they can arise.
3. **Read input file and print contents** - The first basic task before even thinking about the solution to the problem was to make sure that I could input/read a text file and output something to the cli. No code logic involved here. 
4. **Setup jest** - Once I knew that I could get access to the data, I wanted to set up the ability to test my logic before I started writing. I saw that I could use Babel with Jest to transpile the typescript. 
5. **Create failing test** I don't always use TDD, but I generally agree with the principles and benefits of deciding the aim of the code before writing. When I do take the time to write a failing test before coding I always enjoy seeing it turn green that first time. Also, it is beneficial to know that the code I wrote actually solves the intended problem and that I didn't just write the test to match the code.
6. **Complete mvp and make test pass** - I chose to first loop through all the commands in the input file in order to create relevant objects. Instead of just saving each command into it's respective object (partner, employee, company, contact), I wanted to store the data in a structure that would allow for easy and efficient fetching of the desired content. Since there was only one requirement, based around top partners of a company, I chose to save the relevant data on the company object. Now the top partners for a list of companies could be fetched without and nested loops. In the scenario where a new feature is requested, the initialization of the data can be easily modified to add to the structure. However, I generally think it is a good concept to initially save most data in terms of the company since most companies will be around longer than the tenure of an employee or partner. I also decided to save partners as a different object type than employees since there roles in this app seem quite distinct. However, it might make sense to just label them as an employee at a company called Drive depending on the future requirements. I used the inputted names as the identifiers of the objects since the instructions said the names would be unique. In a real world application, this would not be the case and a standard unique identifier would be needed. 
7. **Refactor to extract code blocks into functions** - I did this to increase legibility and potential for shared use in the future. 
8. **Temp combine files to bypass import issue** - I ran into an error where when the code was transpiled to javascript, it could not find local imports without a predefined file extension e.g. `import { Partner } from 'types'`. At the time, all I could find online suggested that I add a `.js` extension even though it was imported in a `.ts` file. However, if I did this, it would cause my tests to break. I temporarily combined the code into one file in order to remove the blocker and address the issue when I had time. 
9. **Refactor to class component** - In order to not have to re-initialize the data each time a request was made of this program, it made sense to refactor to a class component with a constructor to initialize the data. Then I could also expose only the methods that were meant to be shown to the user in the CLI and avoid accidental data manipulation. At this time I also considered converting the Company, Employee, and Partner interfaces to classes (Partner as subclass of Employee) as well. Ultimately I decided against it for the time. However, I think it would be a valuable consideration if I needed to extend this app. If more object specific logic was required, it would be nice to contain it in the specific classes. 
10. **Add .nvmrc file and update run instructions in readme** - pretty self-explanatory. Always safer to ensure we are on the same version of node. 
11. **Build with babel to fix import issue** - I finally realized why my import statements were not working correctly. I had added babel to the repo to manage the transpile and work nicely with jest, but I never actually added it into my build script. I extracted my types to a different file in the next commit. 
12. **Add cli ui and refactor types** - Once I had my code running and structured to fetch data efficiently, I began to think about the UI/UX and how this app could be extended in the future. Ideally, this app could be started up and used to fetch any number of different pieces of information by a user during one session. So I separated the start command and then added user prompts to gather the intended action of the user. In the future the user could select any kind of CRUD operation. The data/commands used to initialize the program could continue to be stored in a text file or moved to a database and fetched on start.
13. **Clean up and add tests** - My philosophy on tests has developed recently. I used to think that more tests were always better and that ever function should have at least one test. Nowadays, I lean more towards the idea that tests should only be written that ensure the acceptance criteria of the user are met. If the top level output is correct based on the input, then the code does what it needs to do and we should have tests to verify that. It may be helpful to write tests for small functions that play a limited role in the overall task during development, but if they are left in the code, it just makes it harder to refactor in the future. I like being able to refactor the code however best, run the tests that check the overall behavior is unchanged and then move on. There is definitely grey area in this topic, but this is the strategy I used here. 




