'use strict';
require('massMsgCss');
let classSet = require('classnames');
class MassMsg extends React.Component{    
    render(){
        let {data} = this.props;
        let e_list = [];
        if(data){
            for(let i in data){
                e_list.push(<span key={i} className="toName">{`${data[i]}，`}</span>);
            }
        }
        return(
            <div className="msg-mass">
                <div className="mass-cont">
                    <div className="to">群发给：</div>
                    <div className="toUser">
                        {e_list}
                        {/*<p className="toMore">......</p>*/}
                    </div> 
                </div>
            </div>
        );
    }
} 
module.exports = MassMsg;
