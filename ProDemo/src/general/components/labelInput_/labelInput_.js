'use strict';
require('labelInput_Css');
let classSet = require('classnames');
class LabelInput_ extends React.Component{
    static propTypes = {    
        b_after:React.PropTypes.bool,//是否有右箭头，默认无
        b_line:React.PropTypes.bool,//是否有线，默认无  
        s_leftImg:React.PropTypes.string,//是否有左侧图片
    }
    static defaultProps = {
        s_Type:"text", 
    }
    render(){
        let {s_leftImg,b_line,b_after,s_Type} = this.props; 
        let labelT = classSet("labelInput_",{"joinImg":s_leftImg,"base-after-line":b_line,"base-before-iconRight":b_after}); 
        let e_leftImg = s_leftImg ?  (<img className="txtImg base-transY" src={s_leftImg} />):"";
        return(
            <div className={labelT}>
                {e_leftImg}
                <div className="txtWrap">
                    <label className="txtName">姓名：</label>
                    <div className="contWrap">
                        <span>测试</span>
                        <input type={s_Type}/>
                    </div>
                </div>
            </div>
        );
    }
} 
module.exports = LabelInput_;