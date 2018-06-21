import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './landing.css'
class Landing extends Component {
    render() {
        return (
            <div>
                <section className="jumbotron text-center">
                    <div className="container">
                        <h1 className="jumbotron-heading">TecHelp</h1>
                        <p className="lead text-muted">we are here to create and Help each other via soft and Hardware Solutions</p>
                        <p>
                            <Link to="/login" className="btn btn-success my-2"> Login </Link>
                            <Link to="/register" className="btn btn-primary my-2"> Sign up </Link>
                        </p>
                    </div>
                </section>
            </div>
        );
    }
}

export default Landing;