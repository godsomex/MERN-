import React, { Component } from 'react';
import axios from 'axios'
import './login.css'
class Login extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password:'',
            error: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value})
    }

    onSubmit(e){
        e.preventDefault();
        const loginUser = {
            email : this.state.email,
            password : this.state.password
        }
        //console.log(loginUser) // testing the login form
        axios.post('/api/users/login', loginUser)
        .then(res => console.log(res.data))
        .catch( err => console.log(err.response.data))
    }
    render() {
        return (
            <div>
                <form className="form-signin" onSubmit = {this.onSubmit}>
                    <img className="mb-4" src="" alt="" width="72" height="72" />
                        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                    <label htmlFor="inputEmail" className="sr-only">Email address</label>
                        <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus onChange = {this.onChange} value = {this.state.email} name = "email"  />
                            <label htmlFor="inputPassword" className="sr-only">Password</label>
                            <input type="password" id="inputPassword" className="form-control" placeholder="Password" required onChange = {this.onChange} value = {this.state.password} name = "password" />
                                <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                                    
                </form>
            </div>
        );
    }
}

export default Login;