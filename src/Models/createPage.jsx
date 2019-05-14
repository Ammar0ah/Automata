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
        <button onClick={this.props.AddQs}>ADD NEW QS</button>
      </div>
    );
  }
}
export default CreatePage;
