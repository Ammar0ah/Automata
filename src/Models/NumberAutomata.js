import Q from "./Q";

class NumberAutomata {
  constructor() {
    this.arr = [];
    this.Q0 = new Q();
  }

  GenerateAutomata = index => {
    //Generating q0
    this.Q0.addq("+", index);
    this.Q0.addq("-", index);
    this.Q0.addq(".", index + 2);
    this.addNumbersToQ(this.Q0, index + 1);

    //Gereating q1
    let q = new Q();
    this.addNumbersToQ(q, index + 1);
    this.arr.push(q);

    //Gereating q2
    q = new Q();
    this.addNumbersToQ(q, index + 1);
    q.addq(".", index + 1);
    q.isFinite = true;
    this.arr.push(q);
    console.log(this.arr);

    //Gereating q3
    q = new Q();
    this.addNumbersToQ(q, index + 3);
    this.arr.push(q);

    //Gereating q4
    q = new Q();
    this.addNumbersToQ(q, index + 3);
    q.isFinite = true;
    this.arr.push(q);
  };

  addNumbersToQ = (q, index) => {
    for (let i = 0; i < 10; i++) {
      q.addq(i.toString(), index);
    }
  };
}

export default NumberAutomata;
