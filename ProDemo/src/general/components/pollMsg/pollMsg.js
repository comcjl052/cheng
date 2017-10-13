'use strict';
require('pollMsgCss');
let f_inter = null;
class PollMsg extends React.Component{
    constructor(props){
        super(props);
        let {notice_list,notice_count} = props;
        notice_count = parseInt(notice_count);
        this.state ={a_data:notice_list||[],i_index:0,i_length:notice_count};
    }
    componentDidMount(){
        let _self = this;
        let i_length = this.state.a_data?this.state.a_data.length:0;
        if(this.state.a_data && i_length>0){
            f_inter = setInterval(()=>{
                 let {i_index} = _self.state;
                 if(i_index<i_length-1){
                     i_index = i_index + 1;
                     _self.setState({i_index:i_index});
                 }else if(i_index>0 && i_index == (i_length-1)){
                     i_index = 0;
                     _self.setState({i_index:i_index});
                 }
             },3000);
        }
       /* let guide_id = this.props.guide_id;
        Com.postNormal({act:"enterprise_message",op:"unreadMessageList",guide_id:guide_id,message_notice:""},function(res){
            if(parseInt(res.code) === 0){
                let message_list = res.data.message_list;
                let len = message_list?message_list.length:0;
                _self.setState({a_data:message_list,i_length:len},()=>{
                    setInterval(()=>{
                        let {i_index,i_length} = _self.state;
                        if(i_index<i_length-1){
                            i_index = i_index + 1;
                            _self.setState({i_index:i_index});
                        }else if(i_index>0 && i_index == (i_length-1)){
                            i_index = 0;
                            _self.setState({i_index:i_index});
                        }
                    },3000);
                });
            }else{
                // Com.toast(res.msg);
            }
        },true);*/
    }
    componentWillReceiveProps(nextProps){
        let {notice_list,notice_count} = nextProps;
        this.setState({a_data:notice_list,i_length:notice_count,i_index:0});
        if(notice_count==0){
            clearInterval(f_inter);
        }
    }
    render(){
        let {a_data,i_index,i_length} = this.state;
        if(!a_data || (a_data.length==0)){
            return null;
        }
        let {add_time,message_content,message_category} = a_data[i_index];
        let {guide_name,guide_id,shop_id} = this.props;
        if(message_category=="wxcard"){
            message_content = "[卡券]";
        }else if(message_category=="guide_news"){
            message_content = "[图文]";
        }else if(message_category=="image"){
            message_content = "[图片]";
        }
        return(
            <div className={"pollMsg joinImg base-before-iconRight"} onClick={()=>Com.openWin("msg_list",{guide_id:guide_id,guide_name:guide_name,shop_id:shop_id})}>
                <img className="txtImg base-transY" src={require("message_offImg")} />
                {i_length>0?<span className="shop_num">{i_length>99?"99+":i_length}</span>:null}
                <div className="txtWrap">
                    <div className="txtCont base-ellipsis">{Com.getTimeFormat(add_time,0)}{` ${message_content}`}</div>
                </div>
            </div>
        );
    }
} 
module.exports = PollMsg;
