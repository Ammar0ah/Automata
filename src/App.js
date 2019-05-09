import React, { Component } from "react";
import "./App.css";
// import Posts from "./components/Posts";
// import Postform from "./components/Postform";
// import { Provider } from "react-redux";
// import store from "./store";
import Statement from "./Models/Statement";
class App extends Component {
  state = {
    Qs: [{ q: [], isFinite: false }],
    Sigma: ["1", "2"],
  };
  AddQs = () => {
    const newQs = [...this.state.Qs];
    newQs.push({ q: [], isFinite: false });
    this.setState({
      Qs: newQs
    })
  };
  AddState = (key, value, index) => {
    const newQ = [...this.state.Qs];
    newQ[index].q = newQ[index].q.concat({ key: key, value: value });
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
    console.log(item);
    let result = item.q.map(koko => {
      if (koko.key === current) return koko.value;
    });
    if (result) return result;
    else return -1;
  };
  isBelong = (current, chain) => {
    let ch = String(chain)
    const Qs = this.state.Qs;
    if (current === -1) return false;
    else if (ch.length === 0) return Qs[current].isFinite;
    else this.isBelong(this.check(ch[0], current), ch.slice(1, ch.length));
  };

  inputValueChanged = event => {
    this.setState({ inputValue: event.target.value });
  };

  
  render() {
    let St = this.state.Qs.map((_, index) => (
      <Statement key={index} clicked={this.AddState} index={index} />
    ));
    return (
     <div>
      
       {St}
      <button onClick={this.AddQs}>ADD NEW QS</button>
      <input type="text" name="iiii" onChange={(e) => this.setState({testInput: e})}></input>
        <button onClick={()=>{ let result = this.isBelong(0,this.state.testInput);alert("result: "+result)}}>Test</button>
      </div>

      
      // <Provider store = {store}>

      // <main className="App">
      //     <Postform/>

      //     <Posts/>
      // </main>
      // </Provider>
    );
  }
}

export default App;
