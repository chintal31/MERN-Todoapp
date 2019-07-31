import React, { Component } from 'react';
import axios from 'axios';

export default class Edit extends Component{
  constructor(props){
    super(props);

    this.state={
      todoname:'',
      todoresponsible:'',
      todopriority:'',
      todocompleted:false
    }
  }

  componentDidMount(){
      axios.get("http://localhost:4000/todos/"+this.props.match.params.id)
          .then(res => this.setState({
            todoname:res.data.todoname,
            todoresponsible:res.data.todoresponsible,
            todopriority:res.data.todopriority,
            todocompleted:res.data.todocompleted
          }))
          .catch((err)=> console.log(err));
  }

  handle_todoname = (e) => {
    this.setState({
      todoname: e.target.value
    })
  }

  handle_todoresponsible = (e) => {
    this.setState({
      todoresponsible: e.target.value
    })
  }

  handle_todopriority = (e) => {
    this.setState({
      todopriority: e.target.value
    })
  }

  handle_todocompleted = (e) => {
    this.setState({
      todocompleted: !this.state.todocompleted
    })
  }

  handle_submit = (e) => {
    e.preventDefault();

    const updatedTodo = {
      todoname: this.state.todoname,
      todoresponsible : this.state.todoresponsible,
      todopriority : this.state.todopriority,
      todocompleted : this.state.todocompleted
    }

    axios.post("http://localhost:4000/todos/update/"+this.props.match.params.id,updatedTodo)
         .then(res => alert(res.data))
         .catch((err) => console.log(err));

        this.props.history.push('/');

    }

  render(){
    return(
      <div>
        <h3>Update todo </h3>
        <form onSubmit={this.handle_submit}>
        <div className="form-group">
              <label>Description: </label>
              <input  type="text"
                      className="form-control" value={this.state.todoname} onChange={this.handle_todoname} />
        </div>
        <div className="form-group">
              <label>Responsible: </label>
              <input  type="text"
                      className="form-control" onChange={this.handle_todoresponsible} value={this.state.todoresponsible}/>
        </div>
        <div className="form-group">
              <div className="form-check form-check-inline">
                  <input  className="form-check-input"
                          type="radio" name="todopriority" value="Low" checked={this.state.todopriority==='Low'} onChange={this.handle_todopriority} /><label className="form-check-label">Low</label>
                      </div>
              <div className="form-check form-check-inline">
                  <input  className="form-check-input"
                          type="radio" name="todopriority" value="High" checked={this.state.todopriority==='High'} onChange={this.handle_todopriority}/><label className="form-check-label">High</label>
              </div>
        </div>
        <div className="form-check">
              <input  type="checkbox"
                    className="form-check-input" value={this.state.todocompleted} checked={this.state.todocompleted} onChange={this.handle_todocompleted}/>
              <label className="form-check-label" htmlFor="completedCheckbox">
                    Completed
              </label>
        </div>
        <br/>
        <div className="form-group">
             <input type="submit" value="Update Todo" className="btn btn-primary" />
        </div>

      </form>
      </div>
    )
  }
}
