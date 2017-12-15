/*
* @Author: leon
* @Date:   2017-12-16 00:31:35
* @Last Modified by:   leon
* @Last Modified time: 2017-12-16 02:46:55
*/
require('./user-center-update.css')
require('page/common/nav/nav.js');
require('page/common/header/header.js')

// require('page/common/nav-side/nav-side.js');
var navSide = require('page/common/nav-side/nav-side.js');

var _mm 			= require('util/mm.js');
var _user 			= require('service/user-service.js');
var templateIndex	= require('./user-center-update.string');

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
		this.bindEvent();
	},
	bindEvent : function(){
		var _this = this;
		//点击提交按钮后的动作
		$(document).on('click','.btn-submit',function(){
			var userInfo = {
				phone	 : $.trim($('#phone').val()),
				email 	 : $.trim($('#email').val()),
				question : $.trim($('#question').val()),
				answer	 : $.trim($('#answer').val())
			},
			validateResult = _this.validateForm(userInfo);
			if(validateResult.status){
				//更改用户信息
				_user.updateUserInfo(userInfo,

					function(res,msg){
						_mm.successTip(msg);
						window.location.href = './user-center.html'
					},
					function(err){
						_mm.errorTip(err);
					}
				);
			}else{
				_mm.errorTip(validateResult.msg);
			}
		});
	},
	// 获取用户信息
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
	},
	//验证字段信息
	validateForm : function(formData){
		var result = {
			status : false,
			msg    : ''	
		};
		
		//验证手机号
		if(!_mm.validate(formData.phone,'phone')){
			result.msg = '手机号格式不正确';
			return result;
		};
		//验证邮箱
		if(!_mm.validate(formData.email,'email')){
			result.msg = '邮箱格式不正确';
			return result;
		};
		//密码提示问题不能为空
		if(!_mm.validate(formData.question,'require')){
			result.msg = '密码提示问题不能为空';
			return result;
		};
		//密码提示问题的答案不能为空
		if(!_mm.validate(formData.answer,'require')){
			result.msg = '密码提示问题的答案不能为空';
			return result;
		};
		//返回正确结果
		result.status = true;
		result.msg = '验证通过';
		return result;
	},

};


$(function(){
	page.init();
})
