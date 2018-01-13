import React, {Component} from 'react'
import ReactDom from 'react-dom'
import './app.css'
import './app.less'

class App extends Component{

	render(){
		return (
			<div className="div divless">hello world, i am Sam shi!</div>
		)
	}
}

ReactDom.render(
	<App />,
	document.getElementById("app")
)
