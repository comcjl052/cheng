

'use strict';
require('common_listCss');

class Common_list extends React.Component{
    static propsTypes = {
        a_data:React.PropTypes.array,
        b_isrecharge:React.PropTypes.number,//0充值明细页面 1充值情况
        f_callBack:React.PropTypes.func,//跳转
    } 
    render(){
        
        return(
            <div className="fansList">
                <div className="listItem">
                    <div className="item_img">
                        <img src={require('pull_fans_logoImg')} className="item_use"/>
                    </div>
                    <div className="item_name">
                        <div className="name">剑圣 <em>在线</em> <span className="base-fr">14：47</span></div>
                        <p>开黑走起~</p>
                    </div>
                </div>
                <div className="sortItem"><span>A</span></div>
                <div className="listItem">
                    <div className="item_img">
                        <img src={require('pull_fans_logoImg')} className="item_use"/>
                    </div>
                    <div className="item_name">
                        <div className="name">盖伦 <em>在线</em></div>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = Common_list;
