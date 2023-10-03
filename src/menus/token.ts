import { data, getChoosen, write } from "../utils/db.js";
import { ERROR, INFO } from "../text/logger.js";
import { get } from "../utils/req.ts";
import { language } from "../text/lang.ts";
import schema from "../utils/schema.ts";

function deleteToken() {
  //wip
}

async function createToken() {
  const body = await get("/token/create");

  if (body.type === "VerifyTokenCreated") {
    INFO(language.createTokenText);
  } else {
    ERROR(language.errorCreateTokenText);
  }
}

async function verifyToken() {
  const asked = await schema.token();
  const choosen = getChoosen();
  if (choosen) choosen.token = asked;
  await write(data);
  const body = await get("/token/verify");
  if (body.type === "VerifyTokenAccepted") {
    if (choosen) choosen.token = body.token;
    await write(data);
    INFO(language.goodVerifyToken);
  } else {
    ERROR(language.errorVerifyToken);
  }
}

export { verifyToken, deleteToken, createToken };
