'use strict';
let BlockBtn = require('blockBtn');
require('submitBtnCss');
class SubmitBtn extends React.Component{
    f_onClick(){
        this.props.onClick && this.props.onClick();
    }
    render(){
       let {s_label=""} = this.props;
        return(
            <div className="submitBtn">
                <BlockBtn s_label={s_label} onClick={()=>this.f_onClick()}/>
            </div>
        );
    }
} 
module.exports = SubmitBtn;
