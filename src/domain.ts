import { messageDomain, noDomain } from "./text/fr.js"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { data, read, write, type Domaines } from "./utils/db.js"
import input from "./utils/input.js"

function listDomain(): void {
    if (data.domains.length === 0) return console.log(noDomain)
    for(const domain of data.domains) {
        console.log(messageDomain(domain))
    }
}

function addDomain(): void {
    //TODO: use zod
    const url = input("")
}

//TODO: finish all these functions
function editDomain(): void {}
function deleteDomain(): void {}
function chooseDomain(): void {}

export {
    listDomain,
    addDomain,
    editDomain,
    deleteDomain,
    chooseDomain
}