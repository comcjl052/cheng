'use strict';
require('search_fansConCss');
class Search_fansCon extends React.Component {
    constructor(props){
        super(props);
        this.state = {imgUrl:this.props.imgUrl};
    }
    f_search(){
        let s_value = this.refs.search.value.trim();
        // if(!s_value){

        // }
        this.props.onClick && this.props.onClick(s_value);
    }
    componentDidMount(){
        //软键盘搜索事件
        let s_value = this.refs.search.value.trim();
        this.refs.search.addEventListener("keypress",(e)=>{
            if(parseInt(e.keyCode) === 13){
                this.props.onClick && this.props.onClick(s_value);
            }
        });
    }
	render() {
		return (
			<div className="search_fansCon">
                <img onClick={()=>this.f_search()}  src={require("search_iconImg")}/>
                <input ref="search" type="search" className="w_search" placeholder="请输入关键字" />
            </div>
		);
	}
}
module.exports = Search_fansCon;




