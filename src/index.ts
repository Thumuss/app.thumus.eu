/* eslint-disable @typescript-eslint/no-unused-vars */
//import fs from "fs/promises";
//import cp from "child_process";
import TUI from "./TUI.js"
import Menu from "./utils/menu.js";
//import env from "./utils/env";
import {
  messageCodes,
  messageConfiguration,
  messageDomaines,
  messagePrincipale,
  messageTokens,
} from "./text/fr.js";
import { addDomain, listDomain } from "./domain.js";
import input from "./utils/input.js";

const history: number[] = [0];



const menus = [
  new Menu(messagePrincipale)
    .addFun(() => history.unshift(1))
    .addFun(() => history.unshift(2))
    .addFun(() => console.log("wip"))
    .addFun(() => history.shift()),
  new Menu(messageDomaines)
    .addFun(() => listDomain())
    .addFun(() => addDomain())/*
    .addFun(() => editDomain())
    .addFun(() => deleteDomain())
    .addFun(() => chooseDomain())
    .addFun(() => changeMenuCodes(history))
    .addFun(() => changeMenuTokens(history))*/
    .addFun(() => history.shift()),
  new Menu(messageCodes),
  new Menu(messageTokens),
  new Menu(messageConfiguration),
];

/*
while (history.length !== 0) {
  const menuNumber = history[0];
  const menu = menus[menuNumber];
  const id = parseInt(await input(menu.text));
  if (isNaN(id)) continue;
  await menu.play(id - 1);
}*/

TUI()