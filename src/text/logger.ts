import chalk from "chalk";

const ColorINFO = (text: string) => chalk.green("[INFO] ") + chalk.bold(text);
const ColorERROR = (text: string) => chalk.red("[ERROR] ") + chalk.bold(text);
const ColorWARNING = (text: string) =>
  chalk.yellow("[WARNING] ") + chalk.bold(text);

type anything = (string | number | null | undefined | bigint | object)[];
const transform = (anyth: anything) => {
  return anyth.map((a) => {
    switch (typeof a) {
      case "bigint":
        return a.toString();
      case "number":
        return a.toString();
      case "undefined":
        return "undefined";
      case "object":
        if (a === null) {
            return "null"
        }
        return a.toString()
      case "string":
        return a;
    }
  });
};
const INFO = (...text: anything) =>
  console.log(ColorINFO(transform(text).join(", ")));
const ERROR = (...text: anything) =>
  console.error(ColorERROR(transform(text).join(", ")));
const WARNING = (...text: anything) =>
  console.warn(ColorWARNING(transform(text).join(", ")));

export { INFO, ERROR, WARNING };
