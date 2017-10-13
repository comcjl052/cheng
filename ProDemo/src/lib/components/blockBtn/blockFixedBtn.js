/*
* @Author: 代汉桥
* @Date:   2016-08-03 09:59:53
* @Last Modified by:   代汉桥
* @Last Modified time: 2016-08-03 10:13:50
*/

'use strict';
var BlockBtn = require('blockBtn');
require('blockBtnCss');
var BlockFixedBtn = React.createClass({
	propTypes:{
		onClick:React.PropTypes.func.isRequired,
		s_label:React.PropTypes.string.isRequired
	},
	render:function(){
		let {s_label,onClick,b_disabled,b_changeSelf} = this.props;
		return (
			<div className="blockFixedBtn">
				<BlockBtn ref="blockBtn" onClick={onClick} s_label={s_label} b_disabled={b_disabled} b_changeSelf={b_changeSelf}/>
			</div>
		);
	}
});
module.exports = BlockFixedBtn;
