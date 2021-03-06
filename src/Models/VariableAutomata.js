import Q from "./Q";
import PreAutomata from "./PreAutomata";
import NumberAutomata from "./NumberAutomata";
import CommentAutomata from "./commentAutomata";

class VariableAutomata {
  constructor() {
    this.arr = [];
    this.PreAutomata = new PreAutomata();
    this.NumberAutomata = new NumberAutomata();
    this.CommentAutomata = new CommentAutomata();
  }
  GenerateAutomata = index => {
    const data = ["int", "float", "double", "long"];
    data.forEach(el => {
      this.PreAutomata.pushWord(el);
    });
    let q = new Q();
    this.PreAutomata.exportToState();
    this.arr = this.PreAutomata.arr;
    this.arr.map(el => {
      if (el.isFinite) {
        el.q.push({ key: " ", value: index + this.arr.length });
        el.isFinite = false;
      }
      return el;
    });
    q = new Q();
    this.addallCharToQ(q, index + this.arr.length + 1);
    this.arr.push(q);
    this.arr[19].q.push({
      key: " ",
      value: 19
    });
    q = new Q();
    this.addallToQ(q, index + this.arr.length);
    q.addq("=", index + this.arr.length + 1);
    this.arr.push(q);
    this.NumberAutomata.GenerateAutomata(this.arr.length + index);
    this.NumberAutomata.arr.map(el => {
      if (el.isFinite) el.isFinite = false;
      this.arr.push(el);
      return el;
    });
    console.log(this.arr.length - 1);
    this.arr[this.arr.length - 1].q.push({
      key: ";",
      value: this.arr.length + index
    });

    this.CommentAutomata.GenerateAutomata(index + this.arr.length);
    let ind = this.arr.length + index;
    for (let el of this.CommentAutomata.arr) {
      this.arr.push(el);
    };

    this.arr[ind].isFinite = true;
    q = new Q();
    q.addq("=", 21);
    q.addq(" ", 32);
    this.arr.push(q);
    this.arr[23].q.push({
      key: ";",
      value: 26
    });
    this.arr[20].q.push({
      key: " ",
      value: 32
    });
    this.arr[20].q.push({
      key: ";",
      value: 26
    });
    this.arr[26].q.push({
      key: " ",
      value: 26
    });
    this.arr[21].q.push({
      key: " ",
      value: 21
    });
  };

  addallToQ = (q, index) => {
    let all = "abcdefghijklmnopqrstuvwxyz0123456789";
    for (let elm of all) {
      q.addq(elm, index);
      all = all.slice(1, all.length);
    }
  };
  addallCharToQ = (q, index) => {
    let all = "abcdefghijklmnopqrstuvwxyz";
    for (let elm of all) {
      q.addq(elm, index);
      all = all.slice(1, all.length);
    }
  };
}
export default VariableAutomata;
