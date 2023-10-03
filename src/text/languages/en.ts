import type { Domaine } from "../../types.js";

const messagePrincipale = `What do you want to do?
Domains...
Config...
Help
Quit`;

const messageTokens = `What do you want to do with your Tokens?
Create a Token
Verify a Token
Delete a Token
Back...`;

const messageCodes = `What do you want to do with Codes?
List the Codes
Create a Code
Delete a Code
Back...`;

const messageDomaines = `What do you want to do with your Domaines?
List them
Add a domain
Edit a domain
Delete a domain
Choose a domain
Codes...
Tokens...
Back...`;

const choixDomaine = `What domain do you want to choose?`;

const messageDomain = (domain: Domaine) => `
- URL: ${domain.url}
- Token: ${domain.token}
- SSH:
  - Username: ${domain.ssh.username}
  - Mdp: ${domain.ssh.password}
  - Domain: ${domain.ssh.domain}
`;

const messageConfiguration = `What config do you need to do?
Kill all remaning process
Reinitiate the config file
Back...`;

const noDomain = "There is no domain in here!";

const defaultVar = (val: string) => `(default=${val})`;

const addDomain = {
  name: "Name: ",
  url: "URL: ",
  infoSSH: "Informations for the ssh connection:",
  username: (name: string) => `Username: ${defaultVar(name)}`,
  password: (name: string) => `Password: ${defaultVar(name)}`,
  domain: `Domain:`,
  port: (name: string) => `Port: ${defaultVar(name)}`,
  portLocal: (name: string) => `Local port: ${defaultVar(name)}`,
  portRemote: (name: string) => `Remote port: ${defaultVar(name)}`,
};

const codeAdded = (code: string) => "Code added! The link is " + code;
const errorCodeAdded = "An error as occured, we can't create your code";
const selectCode = "What code do you choose?";
const codeDeleted = "Code deleted!";
const errorCodeDeleted = "An error as occured, we can't delete your code";

const errorEditDomain = "You don't have any domains!";
const selectDomainEdit = "What domain do you want to edit?";
const selectDomainEditPart = "What part do you want to edit?";
const selectDomainEditPartSSH = "What part of ssh do you want to edit?";

const selectDomainDelete = "What domain do you want to delete?";
const selectDomainChoose = "What domain do you want to choose?";

const createTokenText = "You need to verify your token now!";
const errorCreateTokenText =
  "An error as occured, we can't create your verifying token";

const verifyToken = "Your token: ";
const goodVerifyToken = "You have now a new token! You can use 'Code' tab now!";
const errorVerifyToken = "An error as occured, we can't verify your token";

const tooManyRequest = (time: string) =>
  `Too many request, retry in ${time} seconds`;

const needChooseDomain = "You need to choose a domain!"

const badToken = "A bad token as been provided, try to create a new one"

export default {
  badToken,
  needChooseDomain,
  
  tooManyRequest,

  verifyToken,
  goodVerifyToken,
  errorVerifyToken,

  createTokenText,
  errorCreateTokenText,

  selectDomainEdit,
  selectDomainEditPart,
  selectDomainEditPartSSH,

  selectDomainDelete,
  selectDomainChoose,

  messageCodes,
  messageConfiguration,
  messageDomaines,
  messagePrincipale,
  messageTokens,
  choixDomaine,
  messageDomain,
  noDomain,

  addDomain,

  codeAdded,
  errorCodeAdded,
  selectCode,
  codeDeleted,
  errorCodeDeleted,

  errorEditDomain,
};
