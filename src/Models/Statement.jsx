import React, { Component } from "react";

class Statement extends Component {
  state = {
    inputKey: "",
    inputValue: "",
    inputIndex: "",
    isFinite: false
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
      <div>
        <input
          onChange={e => this.inputChanged(e, "key")}
          value={this.state.inputKey}
        />
        <input
          onChange={e => this.inputChanged(e, "value")}
          value={this.state.inputValue}
        />
        <input
          type="checkbox"
          value={this.state.isFinite}
          onChange={e => this.inputChanged(e, "isFinite")}
        />
        <button
          onClick={() =>
            this.props.clicked(
              this.state.inputKey,
              this.state.inputValue,
              this.props.index,
              this.state.isFinite
            )
          }
        >
          SUBMIT
        </button>
        <h3>key: {this.state.inputKey}</h3>
        <h3>Value: {this.state.inputValue}</h3>
      </div>
    );
  }
}

export default Statement;
