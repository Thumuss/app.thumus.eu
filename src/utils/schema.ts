import { z } from "zod";
import { language } from "../text/lang.js";
import { ask } from "./input.js";
const { addDomain } = language;

const schema = {
  name: (): Promise<string> => ask(addDomain.name, z.string().min(1)),
  url: (): Promise<string> => ask(addDomain.url, z.string().url().min(1)),
  username: (): Promise<string> =>
    ask(addDomain.username("root"), z.string().min(1).default("root")),
  password: (): Promise<string> =>
    ask(addDomain.password(""), z.string().optional(), true),
  port: (): Promise<number> =>
    ask(
      addDomain.port("22"),
      z.coerce.number().int().nonnegative().lte(65535).default(22)
    ),
  portLocal: (): Promise<number> =>
    ask(
      addDomain.portLocal("22"),
      z.coerce.number().int().nonnegative().lte(65535).default(22)
    ),
  portRemote: (): Promise<number> =>
    ask(
      addDomain.portRemote("22"),
      z.coerce.number().int().nonnegative().lte(65535).default(22)
    ),
  domain: (): Promise<string> => ask(addDomain.domain, z.string().min(1)),
  token: (): Promise<string> => ask(language.verifyToken, z.string().min(1))
};

export default schema;
