'use strict';
require('orderGoodsCss');
let classSet = require('classnames');
class OrderGoods extends React.Component{    
    render(){
        let {data} = this.props; 
        data = data || [];
        let e_li = null;
        e_li = data.map((item,key)=>{
            let {goods_image=""} = item;
            return <li key={key}>
                        <img src={Com.getGoodsImg(goods_image,240)}/>
                    </li>;
        });
        return(
            <ul className="goodsList">
               {e_li}
            </ul>
        );
    }
} 
module.exports = OrderGoods;
