import React, { Component } from "react";

class Statement extends Component {
  state = {
    inputKey: "",
    inputValue: "",
    inputIndex: "",
    isFinite: false
    ,label:""
  };
  
  inputChanged = (e, type) => {
    switch (type) {
      case "key":
        this.setState({ inputKey: e.target.value });
        break;
      case "value":
        this.setState({ inputValue: e.target.value });
        break;
      case "isFinite":
        this.setState({ isFinite: !this.state.isFinite });
        break;
    }
  };

  render() {
    return (
      <div className="statment">
        <div>
          <input
            type="text"
            onChange={e => {this.setState({label:this.state.label+e.currentTarget.value}); this.inputChanged(e, "key")}}
            value={this.state.inputKey}

          />
          <input
            type="text"
            onChange={e =>{
              this.setState({ label: this.state.label + e.currentTarget.value })
              this.inputChanged(e, "value")
            }
            } 
              
            value={this.state.inputValue}
          />
          <label className="checkLabel">
            <input
              type="text"
              type="checkbox"
              value={this.state.isFinite}
              onChange={e => this.inputChanged(e, "isFinite")}
            />
            <span className="chk" />
          </label>
        </div>
        <button
          onClick={() =>

           { 
             
             this.props.clicked(
              this.state.inputKey,
              this.state.inputValue,
              this.props.index,
              this.state.isFinite
              )
            }
          }
        >
          SUBMIT
        </button>
      </div>
    );
  }
}

export default Statement;
