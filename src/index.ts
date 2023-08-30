import readline from "readline/promises";
//import fs from "fs/promises";
//import cp from "child_process";

import Menu from "./menu.js";
//import env from "./utils/env";
import {
  messageCodes,
  messageConfiguration,
  messageDomaines,
  messagePrincipale,
} from "./text/fr.js";

const history: number[] = [0];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = (question: string) => rl.question(question);

const menus = [
  new Menu("principal", messagePrincipale)
    .addFun(() => history.unshift(1))
    .addFun(() => history.unshift(2))
    .addFun(() => console.log("wip"))
    .addFun(() => history.shift()),
  new Menu("domain", messageDomaines),
  new Menu("codes", messageCodes),
  new Menu("config", messageConfiguration),
];

while (history.length !== 0) {
  const menuNumber = history[0];
  console.log(history)
  const menu = menus[menuNumber];
  const id = parseInt(await input(menu.text));
  if (isNaN(id)) continue;
  menu.play(id - 1);
}
