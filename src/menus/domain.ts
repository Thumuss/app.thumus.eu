import { language } from "../text/lang.js";
const { messageDomain, noDomain } = language;

import { data, write } from "../utils/db.js";
import { selector } from "../utils/input.js";
import type { Domaine } from "../types.js";
import { ERROR, INFO } from "../text/logger.js";
import schema from "../utils/schema.js";

function listDomain(): void {
  if (data.domains?.length === 0) return ERROR(noDomain);
  for (const domain of data.domains) {
    INFO(messageDomain(domain));
  }
}

async function addDomain(): Promise<void> {
  const name = await schema.name();
  const url = await schema.url();
  const username = await schema.username();
  const password = await schema.password();
  const domain = await schema.domain();
  const port = await schema.port();
  const domainObject: Domaine = {
    name,
    url,
    token: undefined,
    ssh: {
      username,
      password,
      domain,
      port,
    },
  };
  data.domains.push(domainObject);
  await write(data);
}

async function editDomain(): Promise<void> {
  if (data.domains?.length === 0) return ERROR(language.errorEditDomain);
  const nn = await selector(
    language.selectDomainEdit,
    data.domains.map((a) => a.name)
  );
  const domain = data.domains[nn];
  const listDomaines = ["url", "ssh"] as const;
  const numberLD = await selector(language.selectDomainEditPart, listDomaines);
  const typeOf = listDomaines[numberLD];

  if (typeOf === "ssh") {
    const listDomaines = ["username", "password", "domain"] as const;
    const numberLD = await selector(language.selectDomainEditPartSSH, listDomaines);
    const typeOf = listDomaines[numberLD];
    const ssh = domain.ssh;
    ssh[typeOf] = await schema[typeOf]();
  } else {
    domain.url = await schema.url();
  }
  await write(data);
}

async function deleteDomain(): Promise<void> {
  if (data.domains?.length === 0) return ERROR(language.errorEditDomain);
  const nn = await selector(
    language.selectDomainDelete,
    data.domains.map((a) => a.name)
  );

  delete data.domains[nn];
  data.domains = data.domains.filter(a => a !== null)
  await write(data);
}
async function chooseDomain(): Promise<void> {
  if (data.domains?.length === 0) return ERROR(language.errorEditDomain);
  const nn = await selector(
    language.selectDomainChoose,
    data.domains.map((a) => a.name)
  );

  data.choose = data.domains[nn].name;
  await write(data);
}

export { listDomain, addDomain, editDomain, deleteDomain, chooseDomain };
