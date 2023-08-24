import readline from "readline/promises";
import fs from "fs/promises";
import cp from "child_process";
import "dotenv/config"

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
    "\nQue veux tu faire ?\n1 - Créer token\n2 - Vérifier Token\n3 - Lister les codes\n4 - Révoquer un code\n5 - Créer un code\n6 - Relier à distance un port\n7 - Set domain\n9 - Quitter\n> "
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
    case 7:
      await setDomain();
      break;
    case 9:
      process.exit(0);
    default:
      break;
  }
}

async function creerToken() {
  const body = await (
    await fetch(`https://api.${file.domain}:${file.port}/token/create`, options)
  ).json();
  if (body.status === 200) {
    console.log("Vérifie ton discord !");
  } else {
    console.log("Une erreur s'est produite !");
  }
}
async function verifToken() {
  const body = await (
    await fetch(`https://api.${file.domain}:${file.port}/token/verify`, {
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
    await fetch(`https://api.${file.domain}:${file.port}/list`, {
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
    await fetch(`https://api.${file.domain}:${file.port}/delete`, {
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
    await fetch(`https://api.${file.domain}:${file.port}/create`, {
      ...options,
      body: JSON.stringify({
        token: file.token,
        port: portDistant,
        code,
      }),
    })
  ).json();
  console.log(`Le site est : https://${body.code}.serv.${file.domain}:${file.port}/`);
  const cps = cp.exec(
    `sshpass -p ${process.env.code} ssh -fNT -R ${portDistant}:localhost:${portLocal} ${process.env.username}@${file.domain}`
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
    await fetch(`https://api.${file.domain}:${file.port}/create`, {
      ...options,
      body: JSON.stringify({
        token: file.token,
        port: portDistant,
        code,
      }),
    })
  ).json();
  console.log(`Le site est : https://${body.code}.serv.${file.domain}:${file.port}/`);
}


async function setDomain(){
  const dmn = await rl.question("Quel est le domain ?\n> ");
  const port = await rl.question("Quel est le port ?\n> ");
  file.domain = dmn;
  file.port = port || 443;
  await fs.writeFile("./data.json", JSON.stringify(file));
}