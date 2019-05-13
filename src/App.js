import React, { Component } from "react";
import "./App.css";
import Statement from "./Models/Statement";
import PreAutomata from "./Models/PreAutomata";
import NumberAutomata from "./Models/NumberAutomata";
import commentAutomata from "./Models/commentAutomata";
import Q from "./Models/Q";
class App extends Component {
  state = {
    preQs: [],
    numQs: [],
    comQs: [],
    varQs: [],
    Sigma: ["1", "0"],
    testInput: ""
  };
  AddQs = () => {
    const newQs = [...this.state.Qs];
    newQs.push({ q: [], isFinite: false });
    this.setState({
      Qs: newQs
    });
  };
  AddState = (key, value, index, isFinite) => {
    const newQ = [...this.state.Qs];
    newQ[index].q = newQ[index].q.concat({ key: key, value: value });
    newQ[index].isFinite = isFinite;
    this.setState({ Qs: newQ });
    console.log(newQ);
  };
  setFinite = index => {
    const newQ = [...this.state.Qs];
    newQ[index].isFinite = true;
    this.setState({ Qs: newQ });
  };
  check = (current, index, Qs) => {
    let item = Qs[index];
    console.log(Qs, "index:", index, "cur:", current);
    let result = [];
    item.q.forEach(el => {
      if (el.key === current) {
        result.push(el.value);
      }
    });
    // console.log("res", result, "\n", parseInt(result));
    if (result) return result;
    else return -1;
  };

  isBelong = (current, chain, Qs) => {
    console.log("current :", current, "\nchain :", chain);
    console.log(Qs);
    parseInt(current);
    if (current === -1) return false;
    else {
      if (chain.length === 0) return Qs[current].isFinite;
      else {
        let ch = String(chain);
        const c = ch.slice(1, ch.length);
        const resArr = this.check(ch[0], current, Qs);
        let finalRes = false;
        for (let index of resArr) {
          console.log("index: ", index);
          finalRes |= this.isBelong(index, c, Qs);
        }
        return finalRes;
      }
    }
  };

  inputValueChanged = event => {
    this.setState({ inputValue: event.target.value });
  };
  checkifExist = e => {
    let S = String(e.target.value);
    let res = true;
    for (let c in S) {
      console.log(S[c]);
    }
    return res;
  };
  LoadState = () => {
    let Q0 = new Q();
    Q0.addq(" ", 0);
    const preQs = new PreAutomata();
    const numQs = new NumberAutomata();
    const comQs = new commentAutomata();
    preQs.GenerateAutomata();
    numQs.GenerateAutomata(0);
    comQs.GenerateAutomata(0);
    preQs.arr[0].q = [...preQs.arr[0].q, ...Q0.q];
    this.setState({
      preQs: [...preQs.arr],
      numQs: [...numQs.arr],
      comQs: [...comQs.arr]
    });
  };

  render() {
    return (
      <div>
        <button onClick={this.LoadState}>LOAD STATE</button>
        {/* {St} */}
        <button onClick={this.AddQs}>ADD NEW QS</button>
        <input
          value={this.state.testInput}
          onChange={e => {
            this.setState({ testInput: e.currentTarget.value });
          }}
        />
        <button
          onClick={() => {
            const input = this.state.testInput.split(" ");
            let finalinput = [];
            for (let elm of input) {
              if (elm !== "") {
                finalinput.push(elm);
              }
            }
            console.log(input, "\n", this.state.testInput.trim());
            let r = true;
            for (let elm of finalinput) {
              r =
                (this.isBelong(0, elm.trim(), this.state.preQs) ||
                  this.isBelong(0, elm.trim(), this.state.numQs)) &&
                r;
              console.log(JSON.stringify(this.state.Qs), this.state.testInput);
            }
            r =
              this.isBelong(0, this.state.testInput.trim(), this.state.comQs) ||
              r;
            alert("result: " + r);
          }}
        >
          Test
        </button>
      </div>
    );
  }
}

export default App;
