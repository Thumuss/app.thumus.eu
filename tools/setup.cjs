/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const join = (...args) => path.join(__dirname, ...args);
require("dotenv").config({ path: join("../.build.env") });
const fs = require("fs");

const copyEnv = process.env.copyEnv === "true";
const dirPath = (...args) => join("../", ...args);
const buildPath = (...args) => join("../build", ...args);

const pathEnv = dirPath(copyEnv ? "./.env" : "./source/example.env");

console.log("* Wrinting .env files...");
fs.copyFileSync(pathEnv, buildPath("./.env"));
console.log("* Creating data.json...");
fs.mkdirSync(join("../build/db"), { recursive: true });
fs.writeFileSync(
  buildPath("./db/data.json"),
  JSON.stringify({ pids: {}, domains: [] }, null, 2)
);
console.log("* Up to date!");
