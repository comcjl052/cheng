'use strict';
require('myFans_itemCss');
const classSet = require('classnames');
class MyFans_item extends React.Component {
    constructor(props){
        super(props);
        this.state = {b_checked:props.b_checked || false};
    }
    f_onClick(fans_id){
        if(this.props.onClick){
            this.props.onClick(fans_id);
        }else if(this.props.onChange) {
            this.setState({b_checked:!this.state.b_checked},()=>{
                this.props.onChange(fans_id,this.state.b_checked);
            });
        }
    }
    //选中
    f_change(fans_id){
        this.setState({b_checked:!this.state.b_checked},()=>{
            this.props.onChange && this.props.onChange(fans_id,this.state.b_checked);
        });
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.b_reset){
            this.setState({b_checked:false});
        }else if(this.state.b_checked !==nextProps.b_checked){
            this.setState({b_checked:nextProps.b_checked});
        }
    }
	render() {
        let {fans_name,fans_avatar,fans_id,on_line,message_unread_count} = this.props.data;
        let b_checked = this.state.b_checked;
        let e_online = on_line==1?<em>在线</em>:null;
        let {b_after,b_checkBox} = this.props;
        let s_scl = classSet("myFans_item ",{"base-iconRight":b_after});
        let e_box = b_checkBox?<span className={b_checked?"checkWrap on base-transY":"checkWrap base-transY"}></span>:null;
		return (
			<div className={s_scl} onClick={()=>this.f_onClick(fans_id)}>
                <div className="item_img">
                    <img src={fans_avatar} onError={(ev)=>ev.target.src=commonDefaultImg} className="item_use"/>
                    {message_unread_count>0?<span className="base-fr">{message_unread_count>99?"99+":message_unread_count}</span>:null}
                </div>
                <div className="item_name">
                    <div className="name">{fans_name} {e_online}</div>
                </div>
                {e_box}
            </div>
		);
	}
}
module.exports = MyFans_item;




