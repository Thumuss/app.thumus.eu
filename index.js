import readline from "readline/promises";
import fs from "fs/promises";
import cp from "child_process";
import "dotenv/config"

//todo: Merci git d'avoir tout enlevé, et merci moi qui ne vide jamais ma corbeille (j'ai eu une backup)
//todo: À celui qui s'amusera à lire ça, git est obscure sur certains points...

const file = JSON.parse(
  await fs.readFile("./data.json", { encoding: "utf-8" })
);
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

while (true) {
  const rep = await rl.question(
    "\nQue veux tu faire ?\n1 - Créer token\n2 - Vérifier Token\n3 - Lister les codes\n4 - Révoquer un code\n5 - Créer un code\n6 - Relier à distance un port\n9 - Quitter\n> "
  );
  console.log();
  switch (parseInt(rep)) {
    case 1:
      await creerToken();
      break;
    case 2:
      await verifToken();
      break;
    case 3:
      await listCodes();
      break;
    case 4:
      await deleteCode();
      break;
    case 5:
      await createCode();
      break;
    case 6:
      await linkDistant();
      break;
    case 9:
      process.exit(0);
    default:
      break;
  }
}

async function creerToken() {
  const body = await (
    await fetch("https://api.thumus.eu/token/create", options)
  ).json();
  if (body.status === 200) {
    console.log("Vérifie ton discord !");
  } else {
    console.log("Une erreur s'est produite !");
  }
}
async function verifToken() {
  const body = await (
    await fetch("https://api.thumus.eu/token/verify", {
      ...options,
      body: JSON.stringify({
        token: await rl.question("Quel est ton token d'identification ?\n> "),
      }),
    })
  ).json();
  if (body.status === 200) {
    file.token = body.token;
    await fs.writeFile("./data.json", JSON.stringify(file));
    console.log("Token enregistré !");
  }
}

async function listCodes() {
  if (!file.token) return console.log("Il faut un token pour ces fonctions !");
  const body = await (
    await fetch("https://api.thumus.eu/list", {
      ...options,
      body: JSON.stringify({
        token: file.token,
      }),
    })
  ).json();
  console.log(body);
}
async function deleteCode() {
  if (!file.token) return console.log("Il faut un token pour ces fonctions !");
  const code = await rl.question("Quel est le code ?\n> ");
  const body = await (
    await fetch("https://api.thumus.eu/delete", {
      ...options,
      body: JSON.stringify({
        token: file.token,
        code,
      }),
    })
  ).json();

  if (body.status === 200) {
    if (file.pids[code]) {
      cp.exec(`kill -9 ${file.pids[code]}`);
      delete file.pids[code];
      await fs.writeFile("./data.json", JSON.stringify(file));
    }
    
    console.log("good");
  }
}
async function createCode() {
  if (!file.token) return console.log("Il faut un token pour ces fonctions !");
  const portLocal = await rl.question("Quel est le port local ?\n> ");
  const portDistant = await rl.question("Quel est le port distant ?\n> ");
  const code = await rl.question("Quel est le code ?\n> ");
  const body = await (
    await fetch("https://api.thumus.eu/create", {
      ...options,
      body: JSON.stringify({
        token: file.token,
        port: portDistant,
        code,
      }),
    })
  ).json();
  console.log(`Le site est : https://${body.code}.${process.env.subdomain}.${process.env.domain}/`);
  const cps = cp.exec(
    `sshpass -p ${process.env.code} ssh -fNT -R ${portDistant}:localhost:${portLocal} ${process.env.username}@${process.env.domain}`
  );
  if (cps.pid) {
    if (file.pids) {
      file.pids[body.code] = cps.pid;
    } else {
      file.pids = { [body.code]: cps.pid };
    }
    await fs.writeFile("./data.json", JSON.stringify(file));
  } else {
    console.log("ça n'a pas fonctionné :/");
  }
}

async function linkDistant() {
  if (!file.token) return console.log("Il faut un token pour ces fonctions !");
  const portDistant = await rl.question("Quel est le port distant ?\n> ");
  const code = await rl.question("Quel est le code ?\n> ");
  const body = await (
    await fetch("https://api.thumus.eu/create", {
      ...options,
      body: JSON.stringify({
        token: file.token,
        port: portDistant,
        code,
      }),
    })
  ).json();
  console.log(`Le site est : https://${body.code}.${process.env.subdomain}.${process.env.domain}/`);
}
