/*
 * @Author: 黄权
 * @Date:   2016-11-3 14:03:00
 * @Last Modified by:   黄权
 * @Last Modified time: 2016-11-3 14:15:00
 */
'use strict';
require("bbsCommentCss");
class MinPost extends React.Component {
    constructor(props){
        super(props);
        this.state = {b_show:false};
        this.f_show = ()=>{this.setState({b_show:true})};
    }
    f_bgOnClick(ev){
        ev.stopPropagation();
        ev.preventDefault();
        this.setState({b_show:false});
    }
    submitClick(ev){
        ev.stopPropagation();
        let s_value = this.refs.replyText.value;
        if(!s_value){
            return Com.toast("评论内容不能为空");
        }
        this.setState({b_show:false});
       /* $('.minPost .parseContent').html(s_value).parseEmotion();
        s_value =  $('.minPost .parseContent').html();*/
        this.props.submitClick && this.props.submitClick(s_value,this.refs.replyText);
    }
    componentDidMount(){
    }
    render(){
        let {b_show} = this.state;
        let s_class = b_show ? 'minPost' : 'minPost base-hide';
        return <div className={s_class}>
                    <div className="fixed_bg" onClick={(ev)=>this.f_bgOnClick(ev)}></div>
                    <div className="commentForm">
                        <textarea ref="replyText" className="form-control" maxLength={100} placeholder="评论内容，最多100个字符"></textarea>
                        <div className="commentSetting">
                            <span className="base-fl clickEmoj"></span>
                            <div className="base-btn btn-primary base-fr" onClick={(ev)=>this.submitClick(ev)}>评论</div>
                        </div>
                    </div>
                    <div className="base-hide parseContent"></div>
                </div>;
    }
}
module.exports = MinPost;
