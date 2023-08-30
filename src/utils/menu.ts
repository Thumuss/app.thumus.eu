type menuFunction = (() => void) | (() => Promise<void>);
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
    await this.functions[i]();
  }
}

export default Menu;
