import React,{ Component } from 'react';
import PaginationStyle from '../../css/pagination.css';
import * as Constants from '../../common/Constants';

class Pagination extends Component {
	constructor(props) {
		super(props);
		this.state = {
			totalPage: 0,
			currentPage: 1,
			leftLinkDisable: Constants.EMPTY_STRING,
			rightLinkDisable: Constants.EMPTY_STRING,
			textlinkDisable: Constants.EMPTY_STRING
		};
	}

	componentWillReceiveProps = (nextProps) => {
		const {currentPage, totalPage} = nextProps;
		this.setState({
			totalPage: totalPage,
			currentPage: currentPage,
			leftLinkDisable: currentPage === 1 ? Constants.LEFT_LINK_DISABLE : Constants.EMPTY_STRING,
			rightLinkDisable: currentPage === totalPage ? Constants.RIGHT_LINK_DISABLE : Constants.EMPTY_STRING,
			textlinkDisable: currentPage === this.state.currentPage ? Constants.TEXTLINK_DISABLE : Constants.EMPTY_STRING
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
		for(let i = 1; i <= this.state.totalPage; i++) {
      		pageNoList.push(<li key={i} className={this.state.currentPage === i ? PaginationStyle[this.state.textlinkDisable] : Constants.EMPTY_STRING}>
	      		<a onClick={this.choosePage.bind(this, i)}>{i}</a></li>);
      	}
		
		return(	
         	<div>
         		{
         			this.state.totalPage === 0 
         			? Constants.EMPTY_STRING
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
