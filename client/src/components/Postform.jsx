import React, { Component } from 'react'
import {createPost} from '../actions/postActions'
import {connect} from'react-redux'
class Postform extends Component {
    constructor(props){
        super(props)
        this.state = {
            title: '',
            body: ''
        };
    }
    onChange = (e) =>{
     this.setState({[e.target.name] : e.target.value })
     console.log(this.state)
    }
    onSubmit = (e) => {
        e.preventDefault();
        const post = {
            title : this.state.title,
            body : this.state.body
        }
       this.props.createPost(post);
    }

  render() {
    return (
      <div>
          <h3> Add Post</h3>
          <form >
              <div>
                  <label >Title: </label>
                  <br/>
                  <input type="text" name="title" value={this.state.title}
                  onChange = {this.onChange}/>
                
                <br/>
                
                    <label >Body:</label>
                    <br/>
                    <textarea name="body" value={this.state.body}
                     onChange = {this.onChange}></textarea>
                     <br/>
                     <button onClick={this.onSubmit}>Submit</button>
                </div>
          </form>
      </div>
    )
  }
}
export default  connect(null , {createPost})(Postform);