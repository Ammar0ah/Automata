import React, { Component } from "react";
import "./App.css";
import Statement from "./Models/Statement";
import PreAutomata from "./Models/PreAutomata";
import NumberAutomata from "./Models/NumberAutomata";
import commentAutomata from "./Models/commentAutomata";
import VariableAutomata from "./Models/VariableAutomata";
import Q from "./Models/Q";
class App extends Component {
  state = {
    preQs: [],
    numQs: [],
    comQs: [],
    varQs: [],
    Qs: [],
    testInput: "",
    type: ""
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
    let result = [];
    if (item) {
      item.q.forEach(el => {
        if (el.key === current) {
          result.push(el.value);
        }
      });
    }
    // console.log("res", result, "\n", parseInt(result));
    if (result) return result;
    else return -1;
  };

  isBelong = (current, chain, Qs) => {
    console.log(Qs);
    parseInt(current);
    if (current === -1) return false;
    else {
      if (chain.length === 0) {
        if (Qs[current]) {
          return Qs[current].isFinite;
        }
      } else {
        let ch = String(chain);
        const c = ch.slice(1, ch.length);
        const resArr = this.check(ch[0], current, Qs);
        let finalRes = false;
        for (let index of resArr) {
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
    const varQs = new VariableAutomata();
    preQs.GenerateAutomata();
    numQs.GenerateAutomata(0);
    comQs.GenerateAutomata(0);
    varQs.GenerateAutomata(0);
    preQs.arr[0].q = [...preQs.arr[0].q, ...Q0.q];
    this.setState({
      preQs: [...preQs.arr],
      numQs: [...numQs.arr],
      comQs: [...comQs.arr],
      varQs: [...varQs.arr]
    });
  };

  test = () => {
    if (this.isBelong(0, this.state.testInput, this.state.preQs))
      return "This is keyword";
    else if (this.isBelong(0, this.state.testInput, this.state.numQs))
      return "This is Number";
    else if (this.isBelong(0, this.state.testInput, this.state.comQs))
      return "This is Comment";
    else if (this.isBelong(0, this.state.testInput, this.state.varQs))
      return "This is Decleration";
    else return "This is not valid Automata";
  };
  InputChanged = e => {
    this.setState({ testInput: e.currentTarget.value},() => this.setState({type: this.test()}))
  };

  render() {
    let St = this.state.Qs.map((_, i) => (
      <Statement key={i} clicked={this.AddState} index={i} />
    ));
    return (
      <div>
        {St}
        <div className="load-state">
          <button onClick={this.LoadState}>LOAD STATE</button>
        </div>
        {/* <button onClick={this.AddQs}>ADD NEW QS</button> */}
        <div className="input-field">
          <input
            type="text"
            onChange={e => {
              this.InputChanged(e);
            }}
            value={this.state.testInput}
          />
          {/* <span class="input input--jiro">
					<input class="input__field input__field--jiro" type="text" id="input-10" />
					<label class="input__label input__label--jiro" for="input-10">
						<span class="input__label-content input__label-content--jiro">Cat's Name</span>
					</label>
				</span> */}

        </div>
        <h3>{this.state.type}</h3>

      </div>
    );
  }
}

export default App;
