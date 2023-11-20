# Cooler-Drive

A tool to build and analyze an interpersonal network

This app processes a list of commands from a text file formatted like 
- `Partner <Name>`
- `Company <Name>`
- `Employee <Name> <CompanyName>`
- `Contact <EmployeeName> <PartnerName> <ContactType: [email|call|coffee]>`

The output is a list of all companies, sorted alphabetically, mapped to the Partner with the strongest
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

### Run the app with an <input_file>

```bash
npm run start <input_file>
```

Current available features:
1. Generate a list of companies mapped to the top partner


### Run tests

```bash
npm run test
```

## Problem approach and design decisions

