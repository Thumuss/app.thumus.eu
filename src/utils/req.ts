import { language } from "../text/lang.ts";
import { getChoosen } from "./db.ts";
const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  tls: { rejectUnauthorized: false },
};

type RouteCode =
  | "/code/create"
  | "/code/list"
  | "/code/verify"
  | "/code/delete";
type RouteToken = "/token/create" | "/token/verify" | "/token/delete";

type Routes = RouteCode | RouteToken;
const get = async (route: Routes, body?: object) => {
  const choosen = getChoosen();
  if (!choosen) return undefined;
  const origin = await fetch(`${choosen.url}${route}`, {
    ...options,
    body: JSON.stringify({ token: choosen.token, ...body }),
  });
  if (origin.status === 429) {
    throw language.tooManyRequest(
      origin.headers.get("ratelimit-reset") || "unknown"
    );
  } else {
    const data = await origin.json();
    if (data.type === "BadTokenException") throw language.badToken;
    return data;
  }
};

export { get };
