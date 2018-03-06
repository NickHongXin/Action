import React,{ Component } from 'react';
import PaginationStyle from '../../css/pagination.css';

class Pagination extends Component{
	constructor(props){
		super(props);
	}

	render() {
		return(	
	         	<div > 
	         		<div className={ PaginationStyle.paging }>
		              <ul className={ PaginationStyle.link }>
		                <li className={ PaginationStyle.link_left }><span>＜</span></li>
		                <li className={ PaginationStyle.link_right }><span><a href=''>＞</a></span></li>
		              </ul>
		              <ul className={ PaginationStyle.textlink }>
		                <li>1</li>
		                <li><a href=''>2</a></li>
		                <li>3</li>
		              </ul>
		            </div>
	         	</div>
		);
	}
}

export default Pagination;
