'use strict';
require('massMsg_checkedCss');
let classSet = require('classnames');
let Radio = require('radio');
class MassMsg_Check extends React.Component{    
    constructor(props){
        super(props);
        let {i_checkNum=0,i_count=0} = props;
        this.state = {b_disabled:true,i_checkNum:i_checkNum,i_count:i_count};
    }
    _change(checked){
        if(this.props.f_change){
            if(checked){
                let {i_count} = this.state;
                this.setState({b_disabled:i_count==0,i_checkNum:i_count},()=>{
                    this.props.f_change(checked)
                });
            }else {
                this.setState({b_disabled:true,i_checkNum:0},()=>{
                    this.props.f_change(checked)
                });
            }
        }
    }
    componentWillReceiveProps(nextProps){
        if(this.props !== nextProps){
            this.setState({...nextProps});
        }
    }
    componentDidUpdate(){
        if(this.state.b_disabled && this.refs.radio){
            this.refs.radio.refs.input.checked = false;
        }else if(this.state.i_checkNum == this.state.i_count && this.refs.radio){
            this.refs.radio.refs.input.checked = true;
        }else if(this.state.i_checkNum < this.state.i_count && this.refs.radio){
            this.refs.radio.refs.input.checked = false;
        }
    }
    //发送
    f_onClick(){
        if(!this.state.b_disabled){
            this.props.onClick && this.props.onClick();
        }
    }
    render(){
        let {i_checkNum,i_count,b_disabled} = this.state;
        let {b_noCheckBox} = this.props;
        return(
            <div className="fixedMass">
                <div className="leftCheck">
                    {b_noCheckBox?null:<Radio ref="radio" f_changeHandler={this._change.bind(this)} s_radioType="checkbox" s_value="1" s_label="全选"/>}
                </div>
                <div className="rightSend">
                    已选<em>{i_checkNum}</em> / 全部 {i_count}
                    <button className={b_disabled?"send disabled":"send"} onClick={()=>this.f_onClick()}>发送</button>
                </div>
            </div>
        );
    }
} 
module.exports = MassMsg_Check;
