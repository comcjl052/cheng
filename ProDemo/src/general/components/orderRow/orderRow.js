'use strict';
require('orderRowCss');
let classSet = require('classnames');
 let guide_id = Com.getPageParams("guide_id");
class OrderRow extends React.Component{    
    f_onClick(e){
        e.stopPropagation();
        this.props.onClick && this.props.onClick();
    }
    //和粉丝聊天
    f_toChat(e){
        e.stopPropagation();
        if(this.props.b_chat && this.props.fans_id){
            Com.openWin("newsletter",{guide_id:guide_id,fans_id:this.props.fans_id});
        }
    }
    render(){
        let {s_img,b_right,i_type,s_label="",s_price="",s_orderDes="",s_right=""} = this.props;     
        // <div className="itemInfo">
        //     <img src={require('fans_name_iconImg')} className="orderIco base-transY"/>
        //     你的佣金：<span className="fanName">猪八戒</span><span className="orderType base-fr">订单总金额：<em className="yjPrice">￥99.00</em></span>
        // </div>   
        let calssName = b_right ? "orderRow base-iconRight" : "orderRow";
        i_type = parseInt(i_type) || 0;//渲染类型
        let e_row = null;
        switch (i_type) {
            case 1: //你的佣金类型
                e_row = <span>
                            <span className="yjPrice">￥{s_price}</span><span className="orderType">（{s_orderDes}）</span>
                        </span>;
                break;
            case 2: //粉丝名称类型
                e_row = <span>
                    <span className="fanName" onClick={(e)=>this.f_toChat(e)}>{s_right}</span> {s_price ? <span className="orderType base-fr">订单总金额：<em className="yjPrice">￥{s_price}</em></span> : ""}
                </span>;
                break;
            case 3://订单编号
                e_row = <span className="orderNum">{s_right}</span>;
                break;
            default: //示例
                e_row = <span>
                           你的佣金：<span className="yjPrice">￥1.99</span><span className="orderType">（待发货）</span>
                        </span>
                break;
        }
        return(
            <div className={calssName} onClick={(e)=>this.f_onClick(e)}>
                <img src={s_img} className="orderIco base-transY"/>
                {s_label?(s_label+"："):""}{e_row}
            </div>
        );
    }
} 
module.exports = OrderRow;
