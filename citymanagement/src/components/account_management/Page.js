import React,{ Component } from 'react';
import Page from '../../css/page.css';

class Paging extends Component{
	constructor(props){
		super(props);
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
		                <li>1</li>
		                <li><a href=''>2</a></li>
		                <li>3</li>
		              </ul>
		            </div>
	         	</div>
		);
	}
}

export default Paging;
