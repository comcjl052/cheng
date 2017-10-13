// @Author: daihanqiao
// @Date:   2016-01-18 15:12:24
// Copyright (c) 2016 by daihanqiao. All Rights Reserved.
//线上开发环境配置文件

"use strict";
;(function(){
    var config = {
        API_URL:"http://api.smt.hongshanyun.cn/index.php",//api地址
        UPLOAD_PATH:"http://cimg.smt.hongshanyun.cn/",
        XBOX_API_URL:"http://apps.xbox.yunsmt.cn/index.php/wap",//xbox  api地址
        XBOX_UPLOAD_PATH:"http://cimg.xbox.yunsmt.cn/",//xbox cimg地址
        POS_API_URL:"https://posapp.xbox.yunsmt.cn/index.php",//api地址
    };

    if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
		// AMD. Register as an anonymous module.
		define(function() {
			return config;
		});
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = config;
	} else {
		window.config = config;
	}
})();
