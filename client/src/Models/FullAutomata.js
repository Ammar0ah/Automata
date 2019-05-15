import PreAutomata from "./PreAutomata";
import NumberAutomata from "./NumberAutomata";

class FullAutomata {
  constructor() {
    this.preAuto = new PreAutomata();
    this.numberAuto = new NumberAutomata();
    this.arr = [];
  }
  GenerateAutomata = () => {
    this.preAuto.GenerateAutomata();
    this.numberAuto.GenerateAutomata(this.preAuto.arr.length);
    this.arr = [...this.preAuto.arr, ...this.numberAuto.arr];
    this.arr[0].q = [...this.arr[0].q, ...this.numberAuto.Q0.q];
    console.log(this.arr[0]);
  };
}

export default FullAutomata;
