import React,{ Component } from 'react';
import Page from '../../css/Page.css';

class Paging extends Component{
	constructor(props){
		super(props);
		this.state={
			
			
		}
	}

	render() {
		return(	
	         	<div > 
	         		<div className={ Page.paging }>
		              <ul className={ Page.link }>
		                <li className={ Page.link_left }><span>＜</span></li>
		                <li className={ Page.link_right }><span><a href=''>＞</a></span></li>
		              </ul>
		              <ul className={ Page.textlink }>
		                <li><a href=''>1</a></li>
		                <li>2</li>
		                <li><a href=''>3</a></li>
		              </ul>
		            </div>
	         	</div>
		);
	}
}

export default Paging;
