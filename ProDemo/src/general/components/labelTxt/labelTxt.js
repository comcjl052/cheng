'use strict';
require('labelTxtCss');
let classSet = require('classnames');
class LabelTxt extends React.Component{
    static propTypes = {  
        b_right_two:React.PropTypes.bool,//是否允许右label分行显示，默认false   
        b_after:React.PropTypes.bool,//是否有右箭头，默认无
        b_line:React.PropTypes.bool,//是否有线，默认无  
        b_align_right:React.PropTypes.bool,//是否居右显示，默认左  
        s_leftImg:React.PropTypes.string,//是否有左侧图片
        s_label:React.PropTypes.string,//是否有左侧图片
        s_val:React.PropTypes.string,//是否有左侧图片
    }
    render(){
        let {s_leftImg,b_line,b_after,b_right_two,b_align_right,s_label,s_val} = this.props; 
        let labelT = classSet("labelTxt",{"joinImg":s_leftImg,"base-after-line":b_line,"base-before-iconRight":b_after});
        let e_align = classSet("txtWrap",{"alignRight":b_align_right});
        let spanVal = b_right_two ? "txtCont base-ellipsis2":"txtCont base-ellipsis";
        let e_leftImg = s_leftImg ?  (<img className="txtImg base-transY" src={s_leftImg} />):"";
        return(
            <div className={labelT}>
                {e_leftImg}
                <div className={e_align}>
                    <label className="txtName">{s_label}</label>
                    <span className={spanVal}>{s_val}</span>
                </div>
            </div>
        );
    }
} 
module.exports = LabelTxt;
