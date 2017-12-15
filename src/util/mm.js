/*
* @Author: Administrator
* @Date:   2017-12-13 03:56:20
* @Last Modified by:   leon
* @Last Modified time: 2017-12-15 19:34:34
*/


'use strict'

var Hogan = require('hogan.js');

var conf = {
	serverHost : ''
};

var _mm = {

	//网路请求
	request : function (param) {
		var _this = this;
		$.ajax({
			type     : param.method      || 'get',
			url      : param.url         || '',
			dataType : param.dataType    || 'json',
			data     : param.data        || '',
			success  : function(res){
				//请求成功
				if(res.status === 0){
					typeof param.success === 'function' && param.success(res.data,res.msg);

				}
				//没有登录状态，需要强制登录
				else if(10 === res.status){
					_this.doLogin();
				}

				// 请求数据出错
				else if(1 === res.status){
					typeof param.error === 'function' && param.error(res.msg);
				}
			},
			error    : function(err){
				typeof param.error === 'function' && param.error(err.statusText);;
			}
 		})
	},

	//成功提示
	successTip : function(msg){
		alert(msg || '操作成功');
	},

	//错误提示
	errorTip : function(msg){
		alert(msg || '操作失败功');
	},

	//字段的验证，支持是否为空、手机、邮箱的判断
	validate : function(value,type){
		var value = $.trim(value);

		//非空验证
		if(type === 'require'){
			return !!value;
		}
		
		//手机验证
		if(type === 'phone'){
			return /^1\d{10}$/.test(value);
		}
		
		//邮箱验证
		if(type === 'email'){
			return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(value);
		}
	},


	// 统一登录处理
	doLogin : function(){
		//redirect 返回跳进登录页面之前的页面 encodeURIComponent防止截断
		window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href)
	},

	//返回主页
	goHome : function(){
		window.location.href = './index.html';
	},

	// 获取服务器地址   
	getServerUrl : function(path){
		return conf.serverHost + path;
	},

	// 获取url参数
	getUrlParam :function(name){
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
		var result = window.location.search.substr(1).match(reg);
		return result ? decodeURIComponent(result[2]) : null;
	},

	//渲染html 将编译和渲染集成到这一步
	renderHtml : function(htmlTemplate,data){
		var template = Hogan.compile(htmlTemplate),
			result = template.render(data);
		return result;
	}

};


module.exports = _mm;