/*
* @Author: leon
* @Date:   2017-12-16 00:26:31
* @Last Modified by:   leon
* @Last Modified time: 2017-12-16 02:28:40
*/
require('./user-center.css')
require('page/common/nav/nav.js');
require('page/common/header/header.js')

// require('page/common/nav-side/nav-side.js');
var navSide = require('page/common/nav-side/nav-side.js');

var _mm 			= require('util/mm.js');
var _user 			= require('service/user-service.js');
var templateIndex	= require('./user-center.string');

//page逻辑部分 显示一个用户信息
var page = {
	init : function () {
		this.onLoad();
	},
	onLoad : function(){
		// 初始化左侧菜单
		navSide.init({
			name : 'user-center'
		});
		// 加载用户信息
		this.loadUserInfo();
	},
	loadUserInfo : function(){
		var userHtml = '';
		_user.getUserInfo(
			function(res){
				userHtml = _mm.renderHtml(templateIndex,res)
				$('.panel-body').html(userHtml);
			},
			function(err){
				_mm.errorTip(err);
			}
		);
	}
};


$(function(){
	page.init();
})
