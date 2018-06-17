import React, { Component } from 'react';
import './landing.css'
class Landing extends Component {
    render() {
        return (
            <div>
                <section class="jumbotron text-center">
                    <div class="container">
                        <h1 class="jumbotron-heading">TecHelp</h1>
                        <p class="lead text-muted">we are here to create and Help each other via soft and Hardware Solutions</p>
                        <p>
                            <a href="#" class="btn btn-success my-2"> Login </a>
                            <a href="#" class="btn btn-primary my-2"> Sign up </a>
                        </p>
                    </div>
                </section>

            </div>
        );
    }
}

export default Landing;