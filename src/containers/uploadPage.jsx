import React, { Component } from "react";
class UploadPage extends Component {
  render() {
    return (
      <div>
        <button  className="button button--nuka button--round-s button--text-thick">
          <span>Choose file</span>
          <input type="file" onChange={this.props.changed} />
        </button>
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
export default UploadPage;
