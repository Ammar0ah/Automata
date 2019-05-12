import Q from "./trieQ";

class PreAutomata {
  constructor() {
    this.trieArr = [new Q()];
    this.arr = [];
  }

  pushWord = (word, index = 0) => {
    if (word.length === 0) {
      this.trieArr[index].isFinite = true;
      return;
    }
    let c = word[0];
    for (let ind of this.trieArr[index].next) {
      if (this.trieArr[ind].char === c) {
        return this.pushWord(word.slice(1, word.length), ind);
      }
    }
    this.trieArr.push(new Q(c));
    this.trieArr[index].next.push(this.trieArr.length - 1);
    return this.pushWord(word.slice(1, word.length), this.trieArr.length - 1);
  };

  GenerateAutomata = () => {
    let data = [
      "int",
      "implements",
      "do",
      "double",
      "abstract",
      "boolean",
      "break",
      "byte",
      "case",
      "catch",
      "const",
      "continue",
      "default",
      "final",
      "finally",
      "import",
      "instanceof",
      "interface",
      "this",
      "throw",
      "throws",
      "float",
      "long"
    ];
    for (let d of data) {
      this.pushWord(d);
    }
    this.exportToState();
  };

  exportToState = () => {
    for (let Q of this.trieArr) {
      let q = [];
      for (let next of Q.next) {
        q.push({
          key: this.trieArr[next].char,
          value: next
        });
      }
      this.arr.push({
        q: q,
        isFinite: Q.isFinite
      });
    }
  };
}

export default PreAutomata;
