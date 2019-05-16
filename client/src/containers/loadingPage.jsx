import React, { Component } from "react";

class LoadingPage extends Component {
  render() {
    const alertClass = this.props.alert ? "notify  active" : "notify";
    return (
      <div>
        <input type="file" onChange="fileChanged" className="button button--nuka button--round-s button--text-thick" />
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
        <div className={alertClass}>
          <span id="notifyType" className="success" />
        </div>
      </div>
    );
  }
}

export default LoadingPage;
