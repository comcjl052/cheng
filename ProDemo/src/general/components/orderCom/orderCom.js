'use strict';
// require('orderComCss');
let classSet = require('classnames');
class OrderCom extends React.Component{    
    render(){
        let {s_time="",s_way=""} = this.props;  
        return(
            <div className="disCont">
                <span className="diSpan">下单时间：<em>{Com.getTimeFormat(s_time,2)}</em></span>
                <span className="diSpan">配送方式：<em>{s_way}</em></span>
            </div>
        );
    }
} 
module.exports = OrderCom;
