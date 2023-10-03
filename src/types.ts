interface Pids {
  [code: string]: string;
}

interface Ssh {
  username?: string;
  port: number;
  password?: string;
  domain: string;
}

interface Code {
  id: string;
  local?: number;
  remote: number;
}

interface Domaine {
  name: string;
  url: string;
  token?: string;
  ssh: Ssh;
}

type Lang = "en" | "fr";

interface Data {
  pids: Pids;
  domains: Domaine[];
  lang: Lang;
  choose?: Domaine["name"];
}

type menuFunction = (() => void) | (() => Promise<void>);

export { Pids, Ssh, Domaine, Data, Code, menuFunction };
