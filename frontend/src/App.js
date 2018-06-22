import React, { Component } from "react";
import { BrowserRouter,Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import "./App.css";
import Navbar from './components/Navbar'
import Footer from "./components/Footer";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import storeWithMiddleWare from './store'
//reducers take in actions and state( current State) as arguments..they re switch statements => switch ( action.type)
// actions are objects with type and payloads
//payload is object with new state 
//tip: const action = {type : "changeState", payload : {newState : 'new state'}}

class App extends Component {
  render() {
    return (
      <Provider store={storeWithMiddleWare }>
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
      </Provider>
    )
  }
}

export default App;
