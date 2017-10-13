'use strict';
require('keyboard_newCss'); 
let guide_id = Com.getPageParams("guide_id") || "";
let fans_id = Com.getPageParams("fans_id") || "";
let o_time = null;
let e_msgInput = null;
let custom_chat = require("custom_chatImg");
let custom_add = require("custom_addImg");
window.$ = window.jQuery = require("jquery-1.10.2");
require("jquery-sinaEmotion-2.1.0Css");
require("jquery-sinaEmotion-2.1.0");
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
        let self = this;
        self.b_showEmoig = false;
        $('.msg-item .clickEmoj').click(function(event){
            self.setState({isAnim:false},()=>{
                if(!self.b_showEmoig){
                    $(this).sinaEmotion($('.emoijContent'));
                    self.b_showEmoig = true;
                }else {
                    if(document.getElementById("sinaEmotion") && document.getElementById("sinaEmotion").style.display !="none"){
                        $("#sinaEmotion").hide();
                    }else {
                         $(this).sinaEmotion($('.emoijContent'));
                    }
                }
                self.props.f_refresh && self.props.f_refresh(self.state.isAnim);
            });
            event.stopPropagation();
        });
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
        if(document.getElementById("sinaEmotion")){
            document.getElementById("sinaEmotion").style.bottom = document.querySelector(".keyboard_new").offsetHeight + 10 +"px";
        }
        if(b_need){
            this.props.f_focus && this.props.f_focus();
        }
        if(!e_msgInput.value){
            this.props.f_clearFastLang && this.props.f_clearFastLang();
        }
    }
    render(){  
        let keyBoard = this.state.isAnim ? "keyboard_new" : "keyboard_new anim";
        let keyImg = this.state.isAnim ? <img src={require('key_downImg')} /> : <img src={require('key_upImg')} />;   
        let {b_showInfo,s_info,s_defaultValue} = this.state;
        return(
            <div className={keyBoard}>  
                <div className="entry_msg" >
                    <div className="msg-item key"> 
                        <img className="clickEmoj" src={custom_chat}/>
                        <img src={custom_add} onClick={()=>this.f_option()}/>
                    </div>
                    <div className="msg-item"> 
                        {/*<div className="input_div" ref="msgInput" contentEditable={true} onClick={(ev)=>this.f_focus(ev)} onBlur={(ev)=>this.f_blur(ev)}></div>*/}
                        <textarea className="emoijContent" type="text" ref="msgInput" style={{maxHeight:`${i_min*3}px`}} onInput={(ev)=>this.f_input(true)} defaultValue={s_defaultValue} onClick={(ev)=>this.f_focus(ev)} onBlur={(ev)=>this.f_blur(ev)}/>
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
                            <div className="op_item base-trans">
                                <img src={require('key_addImageImg')} />
                                <p>图片</p>
                            </div>
                            <input type="file" className="file_input" accept="image/*" onChange={(ev)=>this.props.f_upload(ev)}/>
                        </li>
                      {/*  <li>
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
                        </li>*/}
                    </ul>
                </div> 
            </div>
        );
    }
} 
module.exports = Keyboard;
