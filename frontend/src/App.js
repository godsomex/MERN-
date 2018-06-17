import React, { Component } from "react";
import { BrowserRouter,Route } from 'react-router-dom'

import "./App.css";
import Navbar from './components/Navbar'
import Footer from "./components/Footer";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
            <div>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            </div>
          <Footer />
        </div>
    </BrowserRouter>
    )
  }
}

export default App;
