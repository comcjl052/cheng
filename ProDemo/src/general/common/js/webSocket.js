let webSocket = null;
let Config = require(__CONFIG__);
module.exports = {
    connect(url) {
        url = url || "ws://120.25.244.173:"+Config.WEBSOCKET_PORT;
        let _self = this;
        if(window.WebSocket){
            webSocket = new WebSocket(url);//连接服务器 
            console.log(webSocket);
        }else{

        }
    },
    onopen(callBack){
        if(webSocket){
            webSocket.onopen = function (event) {
               callBack && callBack(event);
            };
        }
    },
    onmessage(callBack){
        if(webSocket){
            webSocket.onmessage = function (event) {
               callBack && callBack(event);
            };
        }
    },
    onclose(callBack){
        if(webSocket){
            webSocket.onclose = function (event) {
                console.log("WebSocket----close");
                callBack && callBack(event);

            };
        }
    },
    onerror(callBack){
        if(webSocket){
            webSocket.onerror = function (event) {
                console.log("WebSocket----error");
               callBack && callBack(event);
            };
        }
    },
    send(msg){
        if(webSocket && webSocket.readyState==1){
            webSocket.send(msg);
        }else{

        }
    },
}