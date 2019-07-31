import React, {Component} from 'react';
import axios from 'axios';

export default class CreateTodo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            todoname: '',
            todoresponsible: '',
            todopriority: '',
            todocompleted: false
        }
    }

    handle_todoname = (e) => {
        this.setState({
            todoname: e.target.value
        });
    }

    handle_todoresponsible = (e) => {
        this.setState({
            todoresponsible: e.target.value
        });
    }

    handle_todopriority=(e)=> {
        this.setState({
            todopriority: e.target.value
        });
    }

    handle_Submit = (e) => {
        e.preventDefault();

        console.log(`Form submitted:`);
        console.log(`Todo name: ${this.state.todoname}`);
        console.log(`Todo Responsible: ${this.state.todoresponsible}`);
        console.log(`Todo Priority: ${this.state.todopriority}`);
        console.log(`Todo Completed: ${this.state.todocompleted}`);

        const newTodo = {
            todoname: this.state.todoname,
            todoresponsible: this.state.todoresponsible,
            todopriority: this.state.todopriority,
            todocompleted: this.state.todocompleted
        }

        axios.post('http://localhost:4000/todos/add', newTodo)
            .then(res => alert(res.data));

        this.setState({
            todoname: '',
            todoresponsible: '',
            todopriority: '',
            todocompleted: false
        })
    }

    render() {
        return (
          <div style={{marginTop: 20}}>
              <h3>Create New Todo</h3>
                <form onSubmit={this.handle_Submit}>
                <div className="form-group">
                      <label>Description: </label>
                      <input  type="text"
                              className="form-control" onChange={this.handle_todoname} value={this.state.todoname}/>
                    </div>
                    <div className="form-group">
                          <label>Responsible: </label>
                          <input  type="text"
                                  className="form-control" onChange={this.handle_todoresponsible} value={this.state.todoresponsible}/>
                    </div>
                    <div className="form-group">
                          <div className="form-check form-check-inline">
                              <input  className="form-check-input"
                                      type="radio" name="todopriority"  onChange={this.handle_todopriority} value="Low"/>
                            <label className="form-check-label">Low</label>
                        </div>
                        <div className="form-check form-check-inline">
                                  <input  className="form-check-input"
                                          type="radio" name="todopriority"  onChange={this.handle_todopriority} value="High"/>
                            <label className="form-check-label">High</label>
                        </div>
                    </div>
                    <div className="form-group">
                          <input type="submit" value="Create Todo" className="btn btn-primary" />
                      </div>
                  </form>

            </div>
        )
    }
}
