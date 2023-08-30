type menuFunction = () => void;
class Menu {
  name: string;
  functions: menuFunction[];
  text: string;
  constructor(name: string, text: string) {
    this.name = name;
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
