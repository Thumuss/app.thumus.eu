import { menuFunction } from "../types.js";

class Menu {
  functions: menuFunction[];
  text: string;
  constructor(text: string) {
    this.functions = [];
    this.text = text;
  }

  addFun(func: menuFunction): Menu {
    this.functions.push(func);
    return this;
  }

  async play(i: number): Promise<void> {
    return this.functions[i]();
  }
}

export default Menu;
