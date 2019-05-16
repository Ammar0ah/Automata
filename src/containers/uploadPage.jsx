import React, { Component } from "react";
class UploadPage extends Component {
  render() {
    return (
      <div>
        <div className="fileinput-container">
          <input
            type="file"
            name="file"
            id="file"
            onChange={this.props.changed}
          />
          <label
            htmlFor="file"
            className="button button--nuka button--round-s button--text-thick"
          >
            {this.props.name}
          </label>
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
export default UploadPage;
