/*
* @Author: 代汉桥
* @Date:   2016-07-12 09:35:30
* @Last Modified by:   卢旺
* @Last Modified time: 2016-10-18 18:34:18
* 块级按钮
* 用法：<BlockBtn s_label="块级按钮" onClick={this._click}/>
*/

'use strict';
require('blockBtnCss');
class BlockBtn extends React.Component{
	constructor(props){
	    super(props);
	    this.state = {b_disabled:props.b_disabled};
	}
	componentWillReceiveProps(nextProps){
	    if(this.props.b_changeSelf && (nextProps.b_disabled != this.state.b_disabled)){
	        this.setState({b_disabled:nextProps.b_disabled});
	    }
	}
	static propTypes = {
		onClick:React.PropTypes.func.isRequired,
		s_label:React.PropTypes.string.isRequired
	}
	render(){
		let {s_label,onClick,b_changeSelf} = this.props;
		let b_disabled = b_changeSelf?this.state.b_disabled:this.props.b_disabled;//是否可点是通过属性还是状态来控制,false是属性
		return (
			<div className={b_disabled?"blockBtn disabled":"blockBtn"}>
				<div onClick={onClick} className="base-btn base-btn-main" style={{display:"block"}}>
					{s_label}
				</div>
			</div>
		);
	}
}

module.exports = BlockBtn;
