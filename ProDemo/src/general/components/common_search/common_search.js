

'use strict';
require('common_searchCss');

class Common_list extends React.Component{
  /*  static propsTypes = {
        a_data:React.PropTypes.array,
        b_isrecharge:React.PropTypes.number,//0充值明细页面 1充值情况
        f_callBack:React.PropTypes.func,//跳转
    } */
    f_commonSearch(){
        this.props.f_commonSearch && this.props.f_commonSearch(this.refs.search.value);
    }
    componentDidMount(){
        //软键盘搜索事件
        this.refs.search.addEventListener("keypress",(e)=>{
            if(parseInt(e.keyCode) === 13){
                this.props.f_commonSearch && this.props.f_commonSearch(this.refs.search.value);
            }
        });
    }
    render(){
        
        return(
            <div className="search_wrap">
                <img onClick={this.f_commonSearch.bind(this)}  src={require("search_iconImg")}/>
                <input ref="search" type="search" className="w_search" placeholder="请输入关键字" />
            </div>
        );
    }
}

module.exports = Common_list;
