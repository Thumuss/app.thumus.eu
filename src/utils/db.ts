// Simple db with writes and reads

import fs from "fs/promises"

interface Pids {
    [code: string]: string
}

interface Ssh {
    username?: string,
    port: number,
    password?: string,
    domain: string
}

interface Domaines {
    port: number,
    token: string,
    ssh: Ssh
}

interface Data {
    pids: Pids,
    domains: Domaines[]
}

let data: Data  = {pids: {}, domains: []};
async function write(newData: Data): Promise<void>{
    await fs.writeFile(`./data.json`, JSON.stringify(newData, null, 2))
}

async function read(): Promise<void> {
    data = JSON.parse((await fs.readFile(`./data.json`)).toString());
}

read();

export {
    data,
    read,
    write
}