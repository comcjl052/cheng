'use strict';
require('keyboardCss'); 
let guide_id = Com.getPageParams("guide_id") || "";
let fans_id = Com.getPageParams("fans_id") || "";
let o_time = null;
let e_msgInput = null;
function f_HideInfoInTime(el){
    if(o_time){
        clearTimeout(o_time);
    }
    o_time = setTimeout(()=>{
        el.setState({b_showInfo:false});
    },3000);
}
let i_min = Com.getPxReality(14) * 1.5;
class Keyboard extends React.Component{ 
    constructor(props){
        super(props);
        this.state = {isAnim: false,b_showInfo:false,s_info:"",s_defaultValue:props.defaultValue||""};
    }
    f_option(){
        this.setState({isAnim:!this.state.isAnim},()=>{
            this.props.f_refresh && this.props.f_refresh(this.state.isAnim);
        });
    }
    componentDidMount(){
        Com.removeLocalData("fast_language_select");
        e_msgInput = this.refs.msgInput;
        this.f_input(true);
    }
    //添加功能
    f_add(index){
        let _self = this;
        switch (index) {
            case 0://销售术语
                Com.postNormal({act:"enterprise_message",op:"getSalesPatterList"},function(res){
                    if(parseInt(res.code) === 0){
                        if(res.data.sales_patter_list && res.data.sales_patter_list.length>0){
                            Com.openWin("fast_language",{guide_id:guide_id,fans_id:fans_id});
                        }else {//无可用术语
                            _self.setState({b_showInfo:true,s_info:"暂无可用术语"});
                            f_HideInfoInTime(_self);
                        }   
                    }else{
                        Com.toast(res.msg);
                    }
                });
                break;
            case 1://推荐商品
                Com.postNormal({act:"goods",op:"list",mod:"openapi"},function(res){
                    if(parseInt(res.code) === 0){
                       if(res.data.total>0){
                            Com.openWin("goods_all",{guide_id:guide_id,fans_id:fans_id});
                       }else {
                           _self.setState({b_showInfo:true,s_info:"暂无上架商品"});
                           f_HideInfoInTime(_self);
                       }
                    }else{
                        Com.toast(res.msg);
                    }
                });
                break;
            case 2://会员卡
                Com.getNormal({act:"card_view",op:"card_detail",mod:'wap',card_id:"",b_box:1},function(res){
                    if(res.code === 0){
                       if(res.data){
                            Com.openWin('vouche_detail',{card_id:"",fans_id:fans_id,guide_id:guide_id,i_type:1});
                       }else {
                           _self.setState({b_showInfo:true,s_info:"本门店暂无可用会员卡"});
                           f_HideInfoInTime(_self);
                       }
                    }else{
                        Com.toast(res.msg);
                    }
                });
                break;
            case 3://优惠券
                Com.getNormal({act:"card_view",op:"index",mod:'wap',card_id:"",member_card_id:"",b_box:1,member_card_type:"coupon"},function(res){
                    if(res.code === 0){
                       if(res.data && res.data.length>0){
                             Com.openWin("coupons_list",{guide_id:guide_id,fans_id:fans_id});
                       }else {
                           _self.setState({b_showInfo:true,s_info:"本门店暂无可用优惠券"});
                           f_HideInfoInTime(_self);
                       }
                    }else{
                        Com.toast(res.msg);
                    }
                });
                break;
        }
    }
    f_focus(ev){
        this.setState({isAnim:false},()=>{
            /*if(Com.getSysType()==1){
                this.f_timeOut = setTimeout(()=>{
                    this.f_timeOut = null;
                    this.refs.msgInput.scrollIntoViewIfNeeded();
                    this.props.f_focus && this.props.f_focus();
                    this.refs.msgInput.scrollIntoViewIfNeeded();
                },500);
            }*/
            this.f_timeOut = setTimeout(()=>{
                this.f_timeOut = null;
                if(Com.getSysType()==1){
                    this.props.f_focus && this.props.f_focus();
                    window.scrollTo(0,document.body.offsetHeight);
                    this.refs.msgInput.scrollIntoView(true);
                }else {
                    this.props.f_focus && this.props.f_focus();
                }
            },500);
            this.props.f_focus && this.props.f_focus();
        });
    }
    f_blur(){
        if(this.f_timeOut){
            clearTimeout(this.f_timeOut);
        }
    }
    f_sendMsg(){
        this.props.onClick && this.props.onClick(this.refs.msgInput.value);
    }
    f_input(b_need){
        e_msgInput.style.height = i_min +"px";
        e_msgInput.style.height = e_msgInput.scrollHeight + 'px';
        if(b_need){
            this.props.f_focus && this.props.f_focus();
        }
        if(!e_msgInput.value){
            this.props.f_clearFastLang && this.props.f_clearFastLang();
        }
    }
    render(){  
        let keyBoard = this.state.isAnim ? "keyboard" : "keyboard anim";
        let keyImg = this.state.isAnim ? <img src={require('key_downImg')} /> : <img src={require('key_upImg')} />;   
        let {b_showInfo,s_info,s_defaultValue} = this.state;
        return(
            <div className={keyBoard}>  
                <div className="entry_msg" >
                    <div className="msg-item key" onClick={()=>this.f_option()}> 
                        {keyImg}
                    </div>
                    <div className="msg-item"> 
                        {/*<div className="input_div" ref="msgInput" contentEditable={true} onClick={(ev)=>this.f_focus(ev)} onBlur={(ev)=>this.f_blur(ev)}></div>*/}
                        <textarea type="text" ref="msgInput" style={{maxHeight:`${i_min*3}px`}} onInput={(ev)=>this.f_input(true)} defaultValue={s_defaultValue} onClick={(ev)=>this.f_focus(ev)} onBlur={(ev)=>this.f_blur(ev)}/>
                    </div>
                    <div className="msg-item entry">
                        <button className="base-btn base-sm" onClick={()=>this.f_sendMsg()}>发送</button>
                    </div>
                </div>
                <div className="entry_option">
                    <ul>
                        <li>
                            <div className="op_item base-trans" onClick={()=>this.f_add(0)}>
                                <img src={require('key_langImg')} />
                                <p>销售术语</p>
                            </div>
                        </li>
                        <li>
                            <div className="op_item base-trans" onClick={()=>this.f_add(1)}>
                                <img src={require('key_goodsImg')} />
                                <p>推荐商品</p>
                            </div>
                        </li>
                        <li>
                            <div className="op_item base-trans" onClick={()=>this.f_add(2)}>
                                <img src={require('key_menberCarImg')}/>
                                <p>会员卡</p>
                            </div>
                        </li>
                        <li>
                            <div className="op_item base-trans" onClick={()=>this.f_add(3)}>
                                <img src={require('key_saleImg')} />
                                <p>优惠券</p>
                            </div>
                        </li>
                        <li className={b_showInfo?"confirmInfo":"confirmInfo base-hide"}>
                            <div className="op_item base-trans">
                                {s_info}
                            </div>
                        </li>
                    </ul>
                </div> 
            </div>
        );
    }
} 
module.exports = Keyboard;
