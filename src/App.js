import React, { Component } from "react";
import "./App.css";
import Statement from "./Models/Statement";
import FullAutomata from "./Models/FullAutomata";
class App extends Component {
  state = {
    Qs: [],
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
  check = (current, index) => {
    const Qs = this.state.Qs;
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

  isBelong = (current, chain) => {
    console.log("current :", current, "\nchain :", chain);
    const Qs = [...this.state.Qs];
    console.log("IsFinite", Qs[current]);
    parseInt(current);
    if (current === -1) return false;
    else {
      if (chain.length === 0) return Qs[current].isFinite;
      else {
        let ch = String(chain);
        const c = ch.slice(1, ch.length);
        const resArr = this.check(ch[0], current);
        let finalRes = false;
        for (let index of resArr) {
          console.log("index: ",index)
          finalRes |= this.isBelong(index, c);
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
    // S.forEach(el => {
    //   if (!this.state.Sigma.includes(el)) res = false;
    // });
    return res;
  };
  LoadState = () => {
    let Qs = new FullAutomata();
    Qs.GenerateAutomata();
    this.setState({
      Qs: Qs.arr
    });
  };

  render() {
    let St = this.state.Qs.map((_, index) => (
      <Statement key={index} clicked={this.AddState} index={index} />
    ));
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
            let r = this.isBelong(0, this.state.testInput);
            console.log(JSON.stringify(this.state.Qs));
            alert("result: " + r);
            // console.log(this.state.Qs);
          }}
        >
          Test
        </button>
      </div>
    );
  }
}

export default App;
