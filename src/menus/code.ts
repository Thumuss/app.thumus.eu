import { language } from "../text/lang.ts";
import { ERROR, INFO } from "../text/logger.ts";
import { Code, Ssh } from "../types.js";
import { data, getChoosen, write } from "../utils/db.js";
import { selector } from "../utils/input.ts";
import { get } from "../utils/req.ts";
import schema from "../utils/schema.js";
import { exec } from "node:child_process";
const sshCommand = (ssh: Ssh, code: Code) => {
  const pass = ssh.password ? `sshpass -p ${ssh.password} ` : "";
  const local = code.local ? `${code.local}` : "";
  const user = ssh.username ? `${ssh.username}@` : "";
  const sshcmd = `ssh -fNT -R ${code.remote}:localhost:${local} ${user}${ssh.domain} -p ${ssh.port}`;
  return `${pass}${sshcmd}`;
};

async function getCodes() {
  if (!getChoosen()) return [];
  const body = await get("/code/list");
  return body.codes;
}

async function listCodes() {
  for (const b of await getCodes()) {
    console.log(b); //TODO: Better text
  }
}
async function createCode() {
  const choosen = getChoosen();
  if (!choosen) return;
  const portLocal = await schema.portLocal();
  const portRemote = await schema.portRemote();
  const id = await schema.name(); //TODO: Change to a code schema & validator → can't use symbols
  const code: Code = {
    id,
    local: portLocal,
    remote: portRemote,
  };
  const body = await get("/code/create", {
    code: id,
    port: portRemote,
  });
  if (body.type === "CodeCreated") {
    INFO(language.codeAdded(body.url));
  } else {
    console.log(body);
    ERROR(language.errorCodeAdded);
  }
  console.log(portLocal)
  if(portLocal && portLocal != 0 && portLocal != null && portLocal != undefined) {
    const proc = exec(sshCommand(choosen.ssh, code));
    proc.unref();
    if (proc.pid) data.pids[body.code] = proc.pid.toString();
  }
  await write(data);
}
async function deleteCode() {
  if (!getChoosen()) return;
  const codes = await getCodes();
  const selec = await selector(language.selectCode, codes);
  const body = await get("/code/delete", {
    code: codes[selec],
  });

  exec(`kill -9 ${data.pids[codes[selec]]}`).unref();
  delete data.pids[codes[selec]];

  if (body.type === "CodeDeleted") {
    INFO(language.codeDeleted);
  } else {
    ERROR(language.errorCodeDeleted);
  }
}

export { listCodes, createCode, deleteCode };
