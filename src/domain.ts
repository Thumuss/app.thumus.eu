import { messageDomain, noDomain } from "./text/fr.js";
import z from "zod";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { data, read, write, type Domaines } from "./utils/db.js";
import input from "./utils/input.js";

function listDomain(): void {
  if (data.domains.length === 0) return console.log(noDomain);
  for (const domain of data.domains) {
    console.log(messageDomain(domain));
  }
}

const ask = async <T extends z.ZodTypeAny>(inp: string, schema: T) => {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      const anwser = await input(inp);
      return schema.parse(anwser.length === 0 ? undefined : anwser);
    } catch (err) {
      //TODO: better handling obviously
      console.log(err);
    }
  }
};

async function addDomain(): Promise<void> {
  const url = await ask("URL: ", z.string().url().min(1));
  console.log("Ssh:");
  const username = await ask(
    "Username: (default=root) ",
    z.string().min(1).default("root")
  );
  const password = await ask("mdp: ", z.string().optional());
  const port = await ask(
    "port: (default=22) ",
    z.coerce.number().int().nonnegative().lte(65535).default(22)
  );
  const domain = await ask("domain: ", z.string().min(1));
  const domainObject: Domaines = {
    url,
    token: undefined,
    ssh: {
      port,
      password,
      username,
      domain,
    },
  };
  data.domains.push(domainObject);
}

//TODO: finish all these functions
function editDomain(): void {}
function deleteDomain(): void {}
function chooseDomain(): void {}

export { listDomain, addDomain, editDomain, deleteDomain, chooseDomain };
