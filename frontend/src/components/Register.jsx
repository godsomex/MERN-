import React, { Component } from 'react';
import Axios from 'axios';
import classNames from 'classnames'
import { connect } from 'react-redux'

import './register.css'
import { registerUser } from '../actions/authenticateAction'

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name : '',
            email : '',
            password: '',
            passwordConfirm: '',
            errors : {}
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e){
        this.setState({[e.target.name ]: e.target.value})
    }

    onSubmit(e){
        e.preventDefault();
        let newRegisteredUser = {
            name : this.state.name,
            email : this.state.email,
            password : this.state.password,
            passwordConfirm : this.state.passwordConfirm
        }
        // console.log(newRegisteredUser)
        // Axios.post('/api/users/register', newRegisteredUser)
        // .then(res => console.log(res.data))
        //     // .catch(err => console.log(err.response.data))
        // .catch(err => this.setState({errors : err.response.data}))
        this.props.registerUser(newRegisteredUser)
    }
    
    render() {

        //destructuring errors from state 
        const { errors } = this.state
        const { user } = this.props.auth
        return (
            <div className="container">
            {/* {user ? user.name : null}  */}
                <form className="form-horizontal" role="form" onSubmit={this.onSubmit} noValidate >
                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-6">
                            <h2>Register New User</h2>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3 field-label-responsive">
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                                    <div className="input-group-addon" id="awesome"><i className="fa fa-user"></i></div>
                                    <input type="text" name="name" className = { classNames("form-control", { 'is-invalid' : errors.name })} 
                                        id="name"
                                        placeholder="John Doe"
                                        required autoFocus onChange={this.onChange} value={this.state.name} /> 
                                        {errors.name && (<div className="invalid-feedback"> {errors.name}</div>)}
                                </div>
                                
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-control-feedback invalid-feedback">
                                    <span className="text-danger align-middle">
                                    
                                    </span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3 field-label-responsive">
                            <label htmlFor="email">E-Mail Address</label>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                                    <div className="input-group-addon" id="awesome"><i className="fa fa-at"></i></div>
                                    <input type="text" name="email" className="form-control" id="email"
                                        placeholder="you@example.com" required autoFocus onChange={this.onChange} value = {this.state.email} />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-control-feedback">
                                    <span className="text-danger align-middle">
                                        
                                    </span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3 field-label-responsive">
                            <label htmlFor="password">Password</label>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group has-danger">
                                <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                                    <div className="input-group-addon" id="awesome"><i className="fa fa-key"></i></div>
                                    <input type="password" name="password" className="form-control" id="password"
                                        placeholder="Password" required onChange={this.onChange} value= {this.state.password} />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-control-feedback">
                                    <span className="text-danger align-middle">
                                        <i className="fa fa-close"> Example Error Message</i>
                                    </span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3 field-label-responsive">
                            <label htmlFor="password">Confirm Password</label>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                                    <div className="input-group-addon" id="awesome">
                                        <i className="fa fa-repeat"></i>
                                    </div>
                                    <input type="password" name="passwordConfirm" className="form-control"
                                        id="password-confirm" placeholder="Password" required onChange={this.onChange} value = {this.state.passwordConfirm} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-6">
                            <button type="submit" className="btn btn-success"><i className="fa fa-user-plus"></i> Register</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) =>({
    auth: state.auth_user
})
// export default connect(null, registerUser) (Register);
export default connect(mapStateToProps, { registerUser })(Register);