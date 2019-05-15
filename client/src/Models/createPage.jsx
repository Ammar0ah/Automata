import React, { Component } from "react";
import Statement from "./Statement";
class CreatePage extends Component {
  
  render() {
    let St = this.props.Qs.map((_, i) => (
      <Statement key={i} clicked={this.props.AddState} index={i} />
    ));
    return (
      <div>
        {St}
        <hr />
        <button className="addButton" onClick={this.props.AddQs}>
          ADD NEW QS
        </button>
        <div className="input-field">
          <input
            type="text"
            placeholder="write your test code here"
            value={this.props.testInput}
            onChange={e => {
              this.props.InputChanged(e, 1);
            }}
          />
        </div>
        <h3>{this.props.type}</h3>
        <button onClick={this.props.onSaveclick}>Save</button>
      </div>
    );
  }
}
export default CreatePage;
