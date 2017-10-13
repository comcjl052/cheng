'use strict';
require('labelInput_Css');
let classSet = require('classnames');
var Radio = require('radio');
class LabelRadio extends React.Component{
    static propTypes = {    
        b_after:React.PropTypes.bool,//是否有右箭头，默认无
        b_line:React.PropTypes.bool,//是否有线，默认无  
        s_leftImg:React.PropTypes.string,//是否有左侧图片
    }
    static defaultProps = { 
    }
    _change(e){
        this.props.ref_change(e);
    }
    render(){
        let {b_line,b_after,s_oneVal,s_twoVal,b_align_right,s_label} = this.props; 
        let e_align = classSet("txtWrap",{"alignRight":b_align_right});
        let labelT = classSet("labelRadio",{"base-after-line":b_line,"base-before-iconRight":b_after});  
        return(
            <div className={labelT}> 
                <div className={e_align}>
                    <label className="txtName">{s_label}</label>
                    <div className="txtRadio">
                        <Radio f_changeHandler={(e)=>this._change(e)} s_value="1" s_label={s_oneVal}/>
                        <Radio f_changeHandler={(e)=>this._change(e)} s_value="2" s_label={s_twoVal}/>
                    </div>
                </div>
            </div>
        );
    }
} 
module.exports = LabelRadio;