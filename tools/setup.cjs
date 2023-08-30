/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const join = (p) => path.join(__dirname, p);
require("dotenv").config({ path: join("../.build.env") });
const fs = require("fs");

const copyEnv = process.env.copyEnv === "true";
const pathEnv = join(copyEnv ? "../.env" : "../source/example.env");

console.log("* Wrinting .env files...");
fs.copyFileSync(pathEnv, join("../build/.env"));
console.log("* Up to date!");
