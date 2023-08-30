import { Domaines } from "../utils/db.js";

const messagePrincipale = `
Que veux tu faire ?
1 - Domaines...
2 - Configuration...
3 - Aide
9 - Quitter
`;

const messageTokens = `
Que veux tu faire avec les Tokens ?
1 - Créer un Token
2 - Vérifier le Token
3 - Supprimer le Token
9 - Retour...
`;

const messageCodes = `
Que veux tu faire avec les Codes ?
1 - Lister les Codes
2 - Créer un code
3 - Supprimer un code
9 - Retour...
`;

const messageDomaines = `
Que veux tu faire avec tes Domaines ?
1 - Lister mes domaines
2 - Ajouter un domaine
3 - Modifier un domaine
4 - Supprimer un domaine
5 - Choisir un domaine...
6 - Codes...
7 - Tokens...
9 - Retour...
`;

const choixDomaine = (domaines: string[]) => `
Quel domaine veux tu choisir ?
${domaines.map((a, i) => `${i} - "${a}"`).join("\n")}
`;

const messageConfiguration = `
Que veux tu configurer ?
1 - Vider mes processus en fond
2 - Réinitialiser le fichier de configuration
9 - Retour...
`;

const messageDomain = (domain: Domaines) => `
- URL: ${domain.url}
- Token: ${domain.token}
- SSH:
  - Username: ${domain.ssh.username}
  - Mdp: ${domain.ssh.password}
  - Port: ${domain.ssh.port}
  - Domain: ${domain.ssh.domain}
`

const noDomain = "Pas de domaine"

export {
  messageCodes,
  messageConfiguration,
  messageDomaines,
  messagePrincipale,
  messageTokens,

  choixDomaine,
  messageDomain,
  noDomain
};
