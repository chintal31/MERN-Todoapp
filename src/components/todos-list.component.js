import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Todo = (props) => (
  <tr>
    <td> {props.todo.todoname} </td>
    <td> {props.todo.todoresponsible} </td>
    <td> {props.todo.todopriority} </td>
    <td> {props.todo.todocompleted.toString()} </td>
    <td>
      <Link to={'/edit/'+props.todo._id}>Edit</Link>
      <button onClick={() => {props.handledelete(props.todo._id)}}> Delete </button>
    </td>
  </tr>
)


export default class TodosList extends Component {

    constructor(props) {
        super(props);

        this.state = {todos: []};
    }

    handle_delete = (id) =>{

        console.log("in delete method",id);

      axios.delete("http://localhost:4000/todos/delete/"+id)
          .then(res => console.log(res.data))
          .catch((err)=> console.log(err));

          this.props.history.push('/');

    }

    componentDidMount() {

        axios.get('http://localhost:4000/todos/')
            .then(response => {
                this.setState({todos: response.data});

            })
            .catch(function (error) {
                console.log(error);
            })

    }

    componentDidUpdate(){
        axios.get("http://localhost:4000/todos/")
            .then(res => {this.setState({todos:res.data})})
            .catch(err => console.log(err));
    }

    todoList() {
        return this.state.todos.map((currentTodo, i)=> {
            return <Todo todo={currentTodo} handledelete={this.handle_delete} key={i} />;
        });
    }

    render() {
        return (
            <div>
            <h3>Todos List</h3>
              <table className="table table-striped" style={{ marginTop: 20 }}>
                  <thead>
                      <tr>
                          <th>Description</th>
                          <th>Responsible</th>
                          <th>Priority</th>
                          <th>Completed</th>
                          <th>Actions</th>
                      </tr>
                  </thead>
                  <tbody>
                      { this.todoList() }
                  </tbody>
              </table>
            </div>
        )
    }
}
