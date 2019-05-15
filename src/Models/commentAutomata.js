import Q from "./Q";

class commentAutomata {
  constructor() {
    this.arr = [];
  }

  GenerateAutomata = index => {
    //Generating q0
    let q = new Q();
    q.addq("/", index + 1);
    this.arr.push(q);

    //Gereating q1
    q = new Q();
    q.addq("*", index + 2);
    q.addq("/", index + 3);
    this.arr.push(q);

    //Gereating q2
    q = new Q();
    q.addq("*", index + 4);
    q.addq("/", index + 2);
    this.addallToQ(q, index + 2);
    this.arr.push(q);
    console.log(this.arr);

    //Gereating q3
    q = new Q();
    this.addallToQ(q, index + 3);
    q.addq("*", index + 3);
    q.addq("/", index + 3);
    q.isFinite = true;
    this.arr.push(q);

    //Gereating q4
    q = new Q();
    q.addq("/", index + 5);
    this.addallToQ(q, index + 2);
    this.arr.push(q);

    //Gereating q5
    q = new Q();
    q.addq("/", index + 1);
    q.isFinite = true;
    this.arr.push(q);
  };

  addallToQ = (q, index) => {
    let all =
      "'abcdefghijklmnopqrstuvwxyz0123456789(){}[]ABCDEFGHIJKLMNOPQRSTUVWXYZ+-=_.,;:!? #&$%@|^";
    for (let elm of all) {
      q.addq(elm, index);
      all = all.slice(1, all.length);
    }
  };
}

export default commentAutomata;
