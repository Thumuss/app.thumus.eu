import type { Domaine } from "../../types.js";

const messagePrincipale = `Que veux tu faire ?
Domaines...
Configuration...
Aide
Quitter`;

const messageTokens = `Que veux tu faire avec les Tokens ?
Créer un Token
Vérifier le Token
Supprimer le Token
Retour...`;

const messageCodes = `Que veux tu faire avec les Codes ?
Lister les Codes
Créer un code
Supprimer un code
Retour...`;

const messageDomaines = `Que veux tu faire avec tes Domaines ?
Lister mes domaines
Ajouter un domaine
Modifier un domaine
Supprimer un domaine
Choisir un domaine
Codes...
Tokens...
Retour...`;

const choixDomaine = `Quel domaine veux tu choisir ?`;

const messageConfiguration = `Que veux tu configurer ?
Vider mes processus en fond
Réinitialiser le fichier de configuration
Retour...`;

const messageDomain = (domain: Domaine) => `
- URL: ${domain.url}
- Token: ${domain.token}
- SSH:
  - Nom: ${domain.ssh.username}
  - Mot de passe: ${domain.ssh.password}
  - Nom de domaine: ${domain.ssh.domain}
`;

const noDomain = "Pas de domaine";

const defaultVar = (val: string) => `(par défaut=${val})`;

const addDomain = {
  name: "Nom: ",
  url: "URL: ",
  infoSSH: "Informations sur la connexion SSH:",
  username: (name: string) => `Nom: ${defaultVar(name)}`,
  password: (name: string) => `Mot de passe: ${defaultVar(name)}`,
  domain: `Nom de domaine:`,
  port: (name: string) => `Port: ${defaultVar(name)}`,
  portLocal: (name: string) => `Local port: ${defaultVar(name)}`,
  portRemote: (name: string) => `Remote port: ${defaultVar(name)}`,
};

const codeAdded = (code: string) => `Code ajouté ! Le nouveau lien est ${code}`;
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

