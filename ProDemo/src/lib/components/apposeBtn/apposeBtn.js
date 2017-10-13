/*
* @Author: 代汉桥
* @Date:   2016-07-12 09:35:30
* @Last Modified by:   卢旺
* @Last Modified time: 2016-10-18 18:07:42
* 并排两个按钮
* 用法：<ApposeBtn s_leftLabel="确定" s_rightLabel="取消" f_leftClick={this._clickAppose} f_rightClick={this._clickAppose}/>
*/
'use strict';
require('apposeBtnCss');
class ApposeBtn extends React.Component{
    static propTypes = {
        f_leftClick:React.PropTypes.func.isRequired,
        f_rightClick:React.PropTypes.func.isRequired,
        s_leftLabel:React.PropTypes.string.isRequired,
        s_rightLabel:React.PropTypes.string.isRequired,
    }
    render(){
        let left_img = this.props.l_img ? <img src={this.props.l_img} alt=""/> : "";
        let right_img = this.props.r_img ? <img src={this.props.r_img} alt=""/> : "";
        return (
            <div className="apposeBtn base-ovh base-mT20 base-pdLR10">
                <div className="leftBtn" onClick={this.props.f_leftClick}>
                    {left_img}
                    {this.props.s_leftLabel}
                </div>
                <div className="rightBtn" onClick={this.props.f_rightClick}>
                    {right_img}
                    {this.props.s_rightLabel}
                </div>
            </div>
        );
    }
}
module.exports = ApposeBtn;
