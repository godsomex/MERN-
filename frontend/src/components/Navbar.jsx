import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Navbar extends Component {
    render() {
        return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
            <Link className="navbar-brand" to="/">TecHelp</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    <li className="nav-item dropdown">
                        <Link className="nav-link dropdown-toggle" to="/services" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Services</Link>
                        <div className="dropdown-menu" aria-labelledby="dropdown01">
                            <Link className="dropdown-item" to="/">Big Data</Link>
                            <Link className="dropdown-item" to="/">Project management services</Link>
                            <Link className="dropdown-item" to="/">Software development </Link>
                        </div>
                    </li>
                </ul>
               
      </div>
    </nav>
    )
    }
}

export default Navbar