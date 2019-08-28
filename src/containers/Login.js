import React, { Component } from "react";
import {Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import axios from "axios";
import "./Login.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Router, Route, Switch, Redirect } from "react-router-dom";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            token: ""
        };
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        if (sessionStorage.getItem("myToken")) {
            return (
                <Redirect to="/"/>
            );
            }
        else {
            return (
                <Redirect to="/login"/>
            )
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log(
            this.state.username, this.state.password
        )
        axios.post("http://127.0.0.1:8000/api/login",  {
               username: this.state.username,
               password: this.state.password
        })
        .then(res => {
            
            console.log(res);
            sessionStorage.setItem("myToken", res.token)
            this.setState({
                token: res.token
            })
        })
        .catch(err => {
            console.log(err);
        })


    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="navbar-header">
      <a className="navbar-brand" href="#">BAKERY PAYMENTS</a>
    </div>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="nav navbar-nav navbar-right">
      <li className="nav-item active"><a href="#" className="nav-link"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
    </ul>
    </div>
    </nav>
            <div className='Login'>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="username" bsSize="large">
                        <FormLabel>UserName</FormLabel>
                    <FormControl
                    type="username"
                    value={this.state.username}
                    onChange={this.handleChange}
                    />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <FormLabel>Password</FormLabel>
                        <FormControl
                        value={this.state.password}
                        onChange={this.handleChange}
                        type="password"
                        />
                        <br></br>
                        <Button
                        block
                        bSize="large"
                        type="submit">
                            Login
                        </Button>
                    </FormGroup>
                </form>
            </div>
            </div>
        );
    }
}