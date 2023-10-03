// Simple db with writes and reads

import fs from "fs/promises";
import { Data, Domaine } from "../types.js";

let data: Data = { pids: {}, domains: [], lang: "en" };
function reinit() {
  data = { pids: {}, domains: [], lang: "en" };
  return write(data);
}

async function write(newData: Data): Promise<void> {
  await fs.writeFile("./data.json", JSON.stringify(newData, null, 2));
}

async function read(): Promise<void> {
  data = JSON.parse((await fs.readFile("./data.json")).toString());
}

function getChoosen(): Domaine | undefined {
  if (data.choose) {
    return data?.domains.find(a => a.name === data.choose);
  }
}

await read();

export { data, read, write, reinit, getChoosen };
