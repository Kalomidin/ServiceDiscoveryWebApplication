import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import Verify from "./components/verify";
import Authorization from "./components/LoginSignUp";
import Navbar from "./components/Navbar";
import Task from "./components/Task";
import Details from "./components/Details";
import Products from "./components/Product";
import ProductList from "./components/ProductList";
import Default from "./components/Default";
import RegisterVerify from "./components/registerVerify";
import Services from "./components/services";

class App extends Component {
  render() {
    return (
		<React.Fragment>
		<Navbar/>
			<Switch>
				<Route exact path="/" component={ProductList}/>
				<Route exact path="/details" component={Details}/>
				<Route exact path="/task" component={Task}/>
				<Route exact path="/login" component={Authorization}/>
				<Route exact path="/verify" component={Verify}/>
				<Route exact path="/registerVerify" component={RegisterVerify}/>
				<Route exact path="/services" component={Services}/>
				<Route  component={Default}/>
			</Switch>
		</React.Fragment>
    );
  }
}

export default App;
