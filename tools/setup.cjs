/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const join = (...args) => path.join(__dirname, ...args);
require("dotenv").config({ path: join("../.build.env") });
const fs = require("fs");

const copyEnv = process.env.copyEnv === "true";
const dirPath = (...args) => join("../", ...args);
const buildPath = (...args) => join("../build", ...args);
const sourcePath = (...args) => join("../source", ...args);

const pathEnv = dirPath(copyEnv ? "./.env" : "./source/example.env");

if (process.env.ovewriteData === "true") {
  console.log("* Creating data.json...");
  fs.mkdirSync(join("../build/db"), { recursive: true });
  fs.writeFileSync(
    buildPath("./db/data.json"),
    JSON.stringify({ pids: {}, domains: [], lang: "en" }, null, 2)
  );
}

if (process.env.ovewriteEnv === "true") {
  console.log("* Wrinting .env files...");
  fs.copyFileSync(pathEnv, buildPath("./.env"));
}

if (process.env.NODE_ENV === "production") {
  const newPackageJSON = JSON.parse(
    fs.readFileSync(sourcePath("./package.json")).toString()
  );
  const packageJSON = JSON.parse(
    fs.readFileSync(dirPath("./package.json")).toString()
  );
  newPackageJSON.name = process.env.APP_NAME || "app";
  newPackageJSON.version = process.env.APP_VERSION || "1.0.0";
  newPackageJSON.description =
    process.env.APP_DESCRIPTION || "default description";
  newPackageJSON.dependencies = packageJSON.dependencies;
  fs.writeFileSync(
    buildPath("./package.json"),
    JSON.stringify(newPackageJSON, null, 2)
  );
}

console.log("* Up to date!");
