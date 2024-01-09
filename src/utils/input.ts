import inquirer from "inquirer";
import { z } from "zod";

const input = (question: string, password: boolean) =>
  inquirer
    .prompt([
      {
        message: question,
        type: password ? "password" : "input",
        name: "name",
      },
    ])
    .then((a) => a.name);

const selector = async (
  message: string,
  choix: readonly string[]
): Promise<number> => {
  const choices = choix.map((a, i) => ({ name: a, value: i, short: a }));
  return (
    await inquirer.prompt([
      { type: "list", name: "name", message, choices, loop: false },
    ])
  ).name;
};

const ask = async <T extends z.ZodTypeAny>(
  inp: string,
  schema: T,
  password: boolean = false
) => {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      const anwser = await input(inp, password);
      return schema.parse(anwser.length === 0 ? undefined : anwser);
    } catch (err) {
      //TODO: better handling obviously
      const errors = (err as {errors: ErrorZod[]}).errors
      for(const error of errors) {
        parseError(error);
      }
    }
  }
};

interface ErrorZod {
  code: string,
  expected: string,
  received: string,
  path: string[],
  message: string
}

function parseError(error: ErrorZod) {
  console.log(error); // TODO: use lang too
}

export { input, selector, ask };
