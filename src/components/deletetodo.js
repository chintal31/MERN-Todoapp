import React , {Component} from "react";
import axios from "axios";

export default class View extends Component{

  componentDidMount(){
    axios.get("http://localhost:3000/todos/").then(res => alert(res.data));
  }

  render(){
    return(
      <div>
        <h3> View Todos Page </h3>
      </div>
    )
  }
}
