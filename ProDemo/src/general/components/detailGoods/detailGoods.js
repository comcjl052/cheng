'use strict';
require('detailGoodsCss');
let classSet = require('classnames');
let guide_id = Com.getPageParams("guide_id");
class OrderGoods extends React.Component{   
    //商品详情
    f_goodsDetails(goods_alias) {
        Com.openWin("goodDetails",{goods_alias:goods_alias,guide_id:guide_id});
    }
    render(){
        let {s_img} = this.props;  
        let e_img = s_img.map((item,key)=>{
            return <div className="goodItem base-iconRight" data-id={item.gc_id} key={key} onClick={()=>this.f_goodsDetails(item.goods_alias)}>
                    <img src={Com.getGoodsImg(item.goods_image,240)} className="goodImg base-transY"/>
                    <div className="goodInfo">
                        <div className="goodTit base-ellipsis2">{item.goods_name}</div>
                        <div className="goodPrice">￥{item.goods_price} <span className="goodQuan">X{item.goods_num}</span></div>
                        <div className="goodNum">货号：{item.goods_id}</div>
                    </div>
                </div>
        });
        return(
            <div className="good_list">
                {e_img}
            </div> 
        );
    }
} 
module.exports = OrderGoods;
