import React, { Component } from "react";
import "./App.css";
import PreAutomata from "./Models/PreAutomata";
import NumberAutomata from "./Models/NumberAutomata";
import commentAutomata from "./Models/commentAutomata";
import VariableAutomata from "./Models/VariableAutomata";
import Q from "./Models/Q";
import { Route, Switch, NavLink } from "react-router-dom";
import LoadingPage from "./Models/loadingPage";
import CreatePage from "./Models/createPage";

class App extends Component {
  state = {
    preQs: [],
    numQs: [],
    comQs: [],
    varQs: [],
    Qs: [],
    testInput: "",
    type: "Waiting for You :)",
    displayAlert: false
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
      varQs: [...varQs.arr],
      displayAlert: true
    });
    setTimeout(() => this.setState({ displayAlert: false }), 2000);
  };

  test = t => {
    if (t) {
      if (this.isBelong(0, this.state.testInput, this.state.Qs)) return "True";
      else return "false";
    } else {
      if (this.isBelong(0, this.state.testInput, this.state.preQs))
        return "This is keyword";
      else if (this.isBelong(0, this.state.testInput, this.state.numQs))
        return "This is Number";
      else if (this.isBelong(0, this.state.testInput, this.state.comQs))
        return "This is Comment";
      else if (this.isBelong(0, this.state.testInput, this.state.varQs))
        return "This is Decleration";
      else return "This is not valid Automata";
    }
  };
  InputChanged = (e, t) => {
    this.setState({ testInput: e.currentTarget.value }, () => {
      const type = t ? this.test(t) : this.test();
      this.setState({ type: type });
    });
  };

  render() {
    return (
      <div>
        <Switch>
          <Route
            path="/Load"
            exact
            render={() => (
              <LoadingPage
                LoadState={this.LoadState}
                testInput={this.state.testInput}
                InputChanged={this.InputChanged}
                type={this.state.type}
                alert={this.state.displayAlert}
              />
            )}
          />
          <Route
            path="/Create"
            exact
            render={() => (
              <CreatePage
                Qs={this.state.Qs}
                AddState={this.AddState}
                AddQs={this.AddQs}
                testInput={this.state.testInput}
                InputChanged={this.InputChanged}
                type={this.state.type}
              />
            )}
          />
          <Route
            path="/"
            exact
            render={() => (
              <div className="link">
                <NavLink className="NavLink" to="/load">
                  load
                </NavLink>
                <NavLink className="NavLink" to="/create">
                  create
                </NavLink>
              </div>
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
