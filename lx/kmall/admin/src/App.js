
import React,{ Component,Fragment } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from 'pages/login'
import Home from 'pages/home'
import './App.css'

class App extends Component{

	render(){
		return(
			<Router>
				<div className="App">
					<Route exact path="/" component={Home} />
					<Route path="/login" component={Login} />
				</div>
			</Router>
		)
	}
}


export default App;