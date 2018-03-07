import React,{ Component } from 'react';
import PaginationStyle from '../../css/pagination.css';

const LEFT_LINK_DISABLE = 'link_left_disable';
const RIGHT_LINK_DISABLE = 'link_right_disable';
const TEXTLINK_DISABLE = 'textlink_disable';

class Pagination extends Component{
	constructor(props){
		super(props);
		this.state={
			totalPage:0,
			currentPage:1,
			leftLinkDisable:'',
			rightLinkDisable:'',
			textlinkDisable:''
		}
	}

	componentWillReceiveProps = (nextProps) => {
		const {currentPage, totalPage} = nextProps;
		this.setState({
			totalPage: totalPage,
			currentPage: currentPage,
			leftLinkDisable: currentPage === 1 ? LEFT_LINK_DISABLE : '',
			rightLinkDisable: currentPage === totalPage ? RIGHT_LINK_DISABLE : '',
			textlinkDisable: currentPage === this.state.currentPage ? TEXTLINK_DISABLE : ''
		});
	}

	prePage = () => {
		if (this.state.currentPage === 1) {
			return;
		}
		this.props.handleSearch(this.state.currentPage - 1);
	}

	nextPage = () => {
		const {currentPage, totalPage} = this.state;
		if (currentPage === totalPage) {
			return;
		}
		this.props.handleSearch(currentPage + 1);
	}

	choosePage = (pageNo) => {
		if (this.state.currentPage === pageNo) {
			return;
		}
		this.props.handleSearch(pageNo);
	}

	render() {
		let pageNoList = [];
		for(let i=0; i<this.state.totalPage; i++) {
      		pageNoList.push(<li key={i+1} className={this.state.currentPage === i+1 ? PaginationStyle[this.state.textlinkDisable] : ''}>
	      		<a onClick={this.choosePage.bind(this, i+1)}>{i+1}</a></li>);
      	}
		
		return(	
         	<div>
         		{
         			this.state.totalPage === 0 
         			? ''
         			: <div className={PaginationStyle.paging}>
			              <ul className={PaginationStyle.link}>
			                <li className={`${PaginationStyle.link_left} ${PaginationStyle[this.state.leftLinkDisable]}`}>
			                	<a onClick={this.prePage}>＜</a>
		                	</li>
			                <li className={`${PaginationStyle.link_right} ${PaginationStyle[this.state.rightLinkDisable]}`}>
			                	<a onClick={this.nextPage}>＞</a>
		                	</li>
			              </ul>
			              <ul className={PaginationStyle.textlink}>
			              {pageNoList}
			              </ul>
			            </div>
         		}
         	</div>
		);
	}
}

export default Pagination;
