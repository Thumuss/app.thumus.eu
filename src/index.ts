import Menu from "./utils/menu.js";
import { language } from "./text/lang.js";
import {
  addDomain,
  chooseDomain,
  deleteDomain,
  editDomain,
  listDomain,
} from "./menus/domain.js";
import { selector } from "./utils/input.js";
import { getChoosen, reinit } from "./utils/db.js";
import { createCode, deleteCode, listCodes } from "./menus/code.js";
import { createToken, deleteToken, verifyToken } from "./menus/token.ts";
import { ERROR } from "./text/logger.ts";

const history: number[] = [0];

function changeMenu(id: number): void {
  if (!getChoosen()) return ERROR(language.needChooseDomain);
  history.unshift(id);
}

const menus = [
  new Menu(language.messagePrincipale)
    .addFun(() => history.unshift(1))
    .addFun(() => history.unshift(4))
    .addFun(() => console.log("wip"))
    .addFun(() => history.shift()),
  new Menu(language.messageDomaines)
    .addFun(() => listDomain())
    .addFun(() => addDomain())
    .addFun(() => editDomain())
    .addFun(() => deleteDomain())
    .addFun(() => chooseDomain())
    .addFun(() => changeMenu(2))
    .addFun(() => changeMenu(3))
    .addFun(() => history.shift()),
  new Menu(language.messageCodes)
    .addFun(() => listCodes())
    .addFun(() => createCode())
    .addFun(() => deleteCode())
    .addFun(() => history.shift()),
  new Menu(language.messageTokens)
    .addFun(() => createToken())
    .addFun(() => verifyToken())
    .addFun(() => deleteToken())
    .addFun(() => history.shift()),
  new Menu(language.messageConfiguration)
    .addFun(() => killAllProcess())
    .addFun(() => reinit())
    .addFun(() => history.shift()),
];

function killAllProcess() {} // jsp

(async function main() {
  while (history.length !== 0) {
    const menuNumber = history[0];
    const menu = menus[menuNumber];
    const [message, ...msg] = menu.text.split("\n");
    const id = await selector(message, msg);
    try {
      await menu.play(id);
    } catch (e) {
      ERROR(e as string);
    }
  }
})();
