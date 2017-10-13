'use strict';
require('bbsItemCss');
let ZanImg = require('zanIconImg');
let cancelZanImg = require('cancleZanImg');
let userImg = require("user_defaultImg");
let commentImg = require('commentIconImg');
let commonDefaultImg = require("commonDefaultImg");
let my_guide_id = Com.getPageParams("guide_id");
 let s_avatar =  Com.getLocalData("GUIDERAVATAR") || userImg;
class Item extends React.Component {
    constructor(props){
        super(props);
        let {if_likes,likes} = this.props.data;
        this.state = {
            if_likes:if_likes,
            b_showAllComment:false,
            b_showAllContent:false,
            b_hasAllContent:false,
            likes:likes
        };
    }
    openDetail(tid){
        Com.openWin("apps_bbs_detail",{tid:tid});
    }
    f_zan(public_id){
        if(this.state.if_likes != 1){
            Com.postNormal({act:'enterprise_community_msg',op:'like',guide_id:my_guide_id,public_id:public_id},(res)=>{
                if(parseInt(res.code) === 0) {
                    let {likes} = this.state;
                    likes = likes || [];
                    likes.push({guide_avatar:s_avatar});
                    this.setState({if_likes:1,likes:likes});
                }else{
                    Com.toast(res.msg);
                }
            });
        }
    }
    f_reply(public_id){
        this.props.f_reply && this.props.f_reply(public_id);
    }
    f_commemt(public_id,id,key){
        this.props.f_reply && this.props.f_reply(public_id,id,key);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps != this.props){
            let {heats,replies,t_praise_id} = nextProps.data;
            heats = heats || 0;
            replies = replies || 0;
            t_praise_id = (t_praise_id === false || t_praise_id === "false")? 0 : t_praise_id;
            this.setState({i_heats:heats,i_replies:replies,praiseId:t_praise_id});
        }
    }
    componentDidMount(){
        if(this.refs.contentRef.offsetHeight>(Com.getPxReality(16)*6)-6){
            this.setState({b_hasAllContent:true});
        }
    }
    //显示全部评论
    f_allComments(){
        this.setState({b_showAllComment:!this.state.b_showAllComment});
    }
    //展开全文
    f_allContent(){
        this.setState({b_showAllContent:!this.state.b_showAllContent});
    }
    //预览图片
    f_images(img_path,index,ev){
        ev.preventDefault();
        ev.stopPropagation();
        this.props.f_photo && this.props.f_photo(img_path,index);
    }
   /* f_longPress(e){
        console.log('dd',22);
        this.longPressTimeOut = setTimeout(()=>{
            console.log('e',this.f_longPress);
        },1000);
        // e.preventDefault();
    }
    f_longPress_end(ev){
        if(this.longPressTimeOut){
            clearTimeout(this.longPressTimeOut);
        }
        // ev.preventDefault();
    }*/
    render(){
        let {content,guide_avatar,guide_name,add_time,shop_name,img_path,guide_id,public_id,comments} = this.props.data;
        let {if_likes,b_showAllComment,b_showAllContent,b_hasAllContent,likes} = this.state;
        img_path = img_path || [];
        let a_img_path = [];//图片处理成二维数组
        // let e_img = null; //图片列表

        for(let i =0,len=img_path.length;i<len;i++){
            if(i%3 == 0){
                a_img_path.push([]);
            }
            let i_len = a_img_path.length - 1;
            a_img_path[i_len].push(img_path[i]);
        }
       /* e_img = img_path.map((item,key)=>{
            return <li key={key}><img src={item} onError={(ev)=>{ev.target.src=commonDefaultImg}}/></li>;
        });*/
        let e_a_img_path = [];//新图片列表
        e_a_img_path = a_img_path.map((item,key)=>{
            let e_subItem = [];
            if(item){
                for(let i =0;i<3;i++){
                    if(item[i]){
                        e_subItem.push(<li onClick={(ev)=>this.f_images(img_path,key*3+i,ev)} onTouchEnd={(ev)=>{ev.preventDefault()}} key={key+""+i}><img src={item[i]} onError={(ev)=>{ev.target.src=commonDefaultImg}}/></li>);
                    }else {
                        e_subItem.push(<li key={key+""+i}></li>);
                    }
                }
            }
            return <ul className="cardPhotoList" key={key}>
                       {e_subItem}
                    </ul>;
        });
        let e_like = null;//点赞列表
        if(likes && likes.length>0){
            e_like = likes.map((item,key)=>{
                return <img className="lick_member" src={item.guide_avatar} key={key} onError={(ev)=>{ev.target.src=userImg}}/>;
            });
        }
        //评论列表
        let e_comments = null;
        if(comments && comments.length>0){
            e_comments = comments.map((item,key)=>{
                let {guide_name,add_time,guide_avatar,id,content,p_name} = item;
                return  <li key={key} className={(!b_showAllComment&&key>14)?"base-hide":""}>
                            <img className="replyUserIcon" src={guide_avatar}  onError={(ev)=>{ev.target.src=userImg}}/>
                            <div className="replyWrap">
                                <div className="replyOne">
                                    <span className="replyName"><span className="reply_guild">{guide_name}</span> {p_name?<span>回复了<span className="reply_guild">{p_name}</span></span>:null}</span>
                                    <span className="replyLandlord base-fr">{Com.getTimeFormat(add_time,2)}</span>
                                </div>
                                <div className="replyTwo" onClick={()=>this.f_commemt(public_id,id,key)}>
                                    {content}
                                </div>
                            </div>
                        </li>;
            });
        }
        return <div className="contentWrap base-mT10">
            <div className="cardHeader" >
                <img src={guide_avatar} onError={(ev)=>{ev.target.src=userImg}}/>
                <div className="cardInfo">
                    <h3 className="cardUserName"><em>{`${shop_name}（${guide_name}）`}</em></h3>
                    <p className="cardTime">{Com.getTimeFormat(add_time,2)}</p>
                </div>
            </div>
            <div className="cardDescribe">
                <a >
                    <div className="cardDesInfo">
                        <p className={(b_hasAllContent&&!b_showAllContent)?"ellipsis5":""} ref="contentRef">
                           {content}
                        </p>
                        {b_hasAllContent?<div className="all_content">
                            <span onClick={()=>this.f_allContent()}>{b_showAllContent?"收起":"全文"}</span>
                        </div>:null}
                       {/* <ul className="cardPhotoList">
                           {e_img}
                        </ul>*/}
                        {e_a_img_path}
                    </div>
                </a>
            </div>
            <div className="cardOption">
                <span className="carLook rLine" onClick={(ev)=>this.f_zan(public_id)}><img src={if_likes==1?cancelZanImg:ZanImg}/>点赞</span>
                <span className="cardGood" onClick={(ev)=>this.f_reply(public_id)}><img src={commentImg} />评论</span>
            </div>
            {(likes && likes.length>0)?<div className="like_list">
                <div>
                    <img src={cancelZanImg} className="like_icon"/>
                </div>
                <div className="like_container">
                    {e_like}
                </div>
            </div>:null}
            {(comments && comments.length>0)?<div className="comment_list">
                {/*<img src={commentImg} className="comment_icon"/>*/}
                <div className="comment_container">
                    <ul className="replyList">
                        {e_comments}
                    </ul>
                    {(comments && comments.length>15)?<div className="all_content all_replay" onClick={()=>this.f_allComments()}>
                        {b_showAllComment?"隐藏评论":"显示全部"}
                    </div>:null}
                </div>
            </div>:null}
        </div>
    }
}

module.exports = Item;
