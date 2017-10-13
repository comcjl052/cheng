'use strict';
require('labelInput_Css');
let classSet = require('classnames');
class LabelSelect extends React.Component{
    static propTypes = {    
        b_after:React.PropTypes.bool,//是否有右箭头，默认无
        b_line:React.PropTypes.bool,//是否有线，默认无   
    } 
    render(){
        let {b_line,b_after} = this.props; 
        let labelT = classSet("labelSelect",{"base-after-line":b_line,"base-before-iconRight":b_after});  
        return(
            <div className={labelT}> 
                <div className="txtWrap">
                    <label className="txtName">姓名：</label>
                    <div className="contWrap">
                        <span>选择</span>
                        <select>
                            <option value="0">请选择</option>
                            <option value="0">请选择</option>
                            <option value="0">请选择</option>
                        </select>
                    </div>
                </div>
            </div>
        );
    }
} 
module.exports = LabelSelect;