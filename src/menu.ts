type menuFunction = () => void;
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

  play(i: number): void {
    this.functions[i]();
  }
}

export default Menu;
