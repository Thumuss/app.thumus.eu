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
    url: string
    token?: string,
    ssh: Ssh
}

interface Data {
    pids: Pids,
    domains: Domaines[]
}

let data: Data  = {pids: {}, domains: []};



async function write(newData: Data): Promise<void>{
    await fs.writeFile(new URL("../db/data.json", import.meta.url), JSON.stringify(newData, null, 2))
}

async function read(): Promise<void> {
    data = JSON.parse((await fs.readFile(new URL("../db/data.json", import.meta.url))).toString());
}

read();

export {
    data,
    read,
    write,

    Domaines
}