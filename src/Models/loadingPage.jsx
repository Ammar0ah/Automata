import React, { Component } from "react";

class LoadingPage extends Component {
  render() {
    return (
      <div>
        <div className="load-state">
          <button
            className="button button--nuka button--round-s button--text-thick"
            onClick={this.props.LoadState}
          >
            LOAD STATE
          </button>
        </div>
        <div className="input-field">
          <input
            type="text"
            placeholder="write your test code here"
            value={this.props.testInput}
            onChange={e => {
              this.props.InputChanged(e);
            }}
          />
        </div>
        <h3>{this.props.type}</h3>
      </div>
    );
  }
}

export default LoadingPage;
