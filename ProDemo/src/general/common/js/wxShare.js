/*
 * @Author: 黄权
 * @Date:   2016-11-10 13:11:00
 * @Last Modified by:   卢旺
 * @Last Modified time: 2017-02-28 14:34:46
 */
/**
 * 通用分享组件
 * @type:不传默认为0，传1为分享带门店详细信息
 * @hide:不传默认为true,传false为屏蔽分享功能
*/
'use strict';
let Base = require('base');
let Config = require(__CONFIG__);
let store_alias = Base.getPageParams("store_alias");
let shop_id = Base.getPageParams("shop_id") || 0;

function init(f_callBack){
    Base.loadJs("http://res.wx.qq.com/open/js/jweixin-1.2.0.js",()=>{
        //企业号op:wx_share   企业微信op：wx_config_enterprise
        let s_op = 'wx_config_enterprise';
        if(!wx.onMenuShareWechat){
            s_op = 'wx_share';
        }
        Base.postNormal({act: 'normal_base', op: s_op }, (ret)=>{
            if(parseInt(ret.code)===0){
                f_callBack(ret);
            }else{
                // f_callBack(null);
            }
        },true,true);
    });
}

module.exports = {
    showShare(shareParams,type){
        init((ret)=>{
            let {baseURL,title,desc,imgUrl} = shareParams;
            if(type === 1){
                desc = ret.data.shop_name ? ret.data.shop_name : ret.data.store_name;
                imgUrl = ret.data.shop_logo ? ret.data.shop_logo : ret.data.store_logo;
            }
            wx.config({
                debug : false,
                appId: ret.data.appId,
                timestamp: ret.data.timestamp,
                nonceStr: ret.data.noncestr,
                signature: ret.data.signature,
                jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareWechat']
            });
            wx.ready(function(){
                /*wx.checkJsApi({
                   jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareWechat'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                   success: function(res) {
                       // 以键值对的形式返回，可用的api值true，不可用为false
                       // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                   }
                });*/
                wx.onMenuShareTimeline({//分享到朋友圈
                    title: title,
                    link: baseURL,
                    imgUrl: imgUrl,
                    success: function(){//接口调用成功时执行的回调函数
                    },
                    fail: function(){//接口调用失败时执行的回调函数
                    },
                    complete: function(){//接口调用完成时执行的回调函数，无论成功或失败都会执行
                    },
                    cancel: function(){//用户点击取消时的回调函数，仅部分有用户取消操作的api才会用到
                    }
                });
                wx.onMenuShareAppMessage({//分享给朋友
                    title: title,
                    desc: desc,
                    link: baseURL,
                    imgUrl: imgUrl,
                    type: '',//分享类型,music、video或link，不填默认为link
                    dataUrl: '',// 如果type是music或video，则要提供数据链接，默认为空
                });
                wx.onMenuShareWechat({
                    title: title, // 分享标题
                    desc: desc, // 分享描述
                    link: baseURL, // 分享链接
                    imgUrl: imgUrl, // 分享图标
                    success: function () {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });
            });
            wx.error(function(res){//错误上报
                // alert(2);
                // alert('wx.error: '+JSON.stringify(res));
            });
        })
    },
    hideShare(){
        init((ret)=>{
            console.log("禁用");
            wx.config({
                debug : false,
                appId: ret.data.appId,
                timestamp: ret.data.timestamp,
                nonceStr: ret.data.noncestr,
                signature: ret.data.signature,
                jsApiList: ['hideMenuItems']
            });
            wx.ready(function(){
                wx.hideMenuItems({
                    menuList:["menuItem:share:appMessage",//发送给朋友
                              "menuItem:share:timeline",//分享到朋友圈
                              "menuItem:share:qq",//分享到QQ
                              "menuItem:share:weiboApp",//分享到微博
                              "menuItem:share:facebook",//分享到fecebook
                              "menuItem:share:QZone"]//分享到QQ空间
                });
            });
            wx.error(function(res){//错误上报
                // console.log("=====",res);
                alert('wx.error: '+JSON.stringify(res));
            });
        })
    }
}
