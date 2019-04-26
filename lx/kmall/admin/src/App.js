
import React,{ Component,Fragment } from 'react'
import { BrowserRouter as Router, Route,Redirect,Switch } from "react-router-dom";

import Login from 'pages/login'
import Home from 'pages/home'
import User from 'pages/user'

import { getUserName } from 'util'

import './App.css'

class App extends Component{

	render(){
		const ProtectRoute = ({component:Component,...rest})=>(
			<Route
				{...rest}
				render={(props)=>{
					return getUserName()
					? <Component {...props}  />
					: <Redirect to="/login" />
				}}
			/>
		)
		const LoginRoute = ({component:Component,...rest})=>{
			return getUserName()
			? <Redirect to="/" />
			: <Component {...rest}  />
		}




		return(
			<Router>
				<div className="App">
					<Switch>
						<ProtectRoute exact path="/" component={Home} />
						<LoginRoute path="/login" component={Login} />
						<ProtectRoute path="/user" component={User} />
					</Switch>
				</div>
			</Router>
		)
	}
}


export default App;