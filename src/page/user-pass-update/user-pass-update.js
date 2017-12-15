/*
* @Author: leon
* @Date:   2017-12-16 02:53:49
* @Last Modified by:   leon
* @Last Modified time: 2017-12-16 03:25:36
*/
require('./user-pass-update.css')
require('page/common/nav/nav.js');
require('page/common/header/header.js')

// require('page/common/nav-side/nav-side.js');
var navSide = require('page/common/nav-side/nav-side.js');

var _mm 			= require('util/mm.js');
var _user 			= require('service/user-service.js');
// var templateIndex	= require('./user-center.string');

//page逻辑部分 显示一个用户信息
var page = {
	init : function () {
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
		// 初始化左侧菜单
		navSide.init({
			name : 'user-pass-update'
		});
	},
	bindEvent : function(){
		var _this = this;
		//点击提交按钮后的动作
		$(document).on('click','.btn-submit',function(){
			var userInfo = {
				password	 	: $.trim($('#password').val()),
				passwordNew     : $.trim($('#password-new').val()),
				passwordConfirm : $.trim($('#password-confirm').val())
			},
			validateResult = _this.validateForm(userInfo);
			if(validateResult.status){
				//更改用户信息
				_user.updatePassword({
						passwordOld : userInfo.password,
						passwordNew : userInfo.passwordNew
					},
					function(res,msg){
						_mm.successTip(msg);
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
	validateForm : function(formData){
		var result = {
			status : false,
			msg    : ''	
		};
		
		//验证原密码不为空
		if(!_mm.validate(formData.password,'require')){
			result.msg = '原密码为空';
			return result;
		};
		//验证新密码是否为空且不小于6个字符
		if( !formData.passwordNew || formData.passwordNew.length < 6){
			result.msg = '密码至少六个字符';
			return result;
		};
		//验证两次新密码输入是否相同
		if( formData.passwordNew !== formData.passwordConfirm ){
			result.msg = '两次输入密码不相同';
			return result;
		}
		
		//返回正确结果
		result.status = true;
		result.msg = '验证通过';
		return result;
	}	
		
};


$(function(){
	page.init();
})