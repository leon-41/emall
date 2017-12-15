/*
* @Author: Administrator
* @Date:   2017-12-12 17:19:11
* @Last Modified by:   leon
* @Last Modified time: 2017-12-16 01:00:28
*/
"use strict"
require('page/common/nav-simple/nav-simple.js');
require('./user-register.css');

var _mm 	= require('util/mm.js');
var _user 	= require('service/user-service.js');

//表单里的错误提示
var formError = {
	show : function(errMsg){
		$('.error-item').show().find('.err-msg').text(errMsg)
	},
	hide : function(){
		$('.error-item').hide().find('.err-msg').text('')
	}
};
//page逻辑部分
var page = {
	init : function () {
		this.bindEvent();
	},
	bindEvent : function(){
		var _this = this;

		//验证username  blur事件：失去焦点时触发 
		$('#username').blur(function(){
			//使用this，因为blur事件的调用者就是$('#username')
			var username = $.trim($(this).val());
			//用户名为空则不进行验证
			if(!username){
				return;
			}
			//异步验证用户是否存在
			_user.checkUsername(username,
				function(res){
					formError.hide();
				},
				function(err){
					formError.show(err);
				}
			)
		});
		//按钮的提交
		$('#submit').click(function(){
			_this.submit();
		});
		// 如果按下回车也会提交
		$('.user-content').keyup(function(e){
			if(e.keyCode === 13){
				_this.submit();
			}
		});

	},
	//提交表单
	submit :function(){
		var formData = {
			username 		: $.trim($('#username').val()),
			password 		: $.trim($('#password').val()),
			passwordConfirm : $.trim($('#password-confirm').val()),
			email 			: $.trim($('#email').val()),
			phone 			: $.trim($('#phone').val()),
			question 		: $.trim($('#question').val()),
			answer 			: $.trim($('#answer').val()),
		},
		//表单验证结果
		validateResult = this.formValidate(formData);
		//验证成功
		if(validateResult.status){
			_user.register(formData,
				function(res){
					window.location.href = './result.html?type=register';
				},
				function(err){
					formError.show(err);
				}
			)
		}
		//验证失败
		else{
			formError.show(validateResult.msg);
		}
	},

	formValidate : function(formData){
		var result = {
			status : false,
			msg    : ''	
		};
		//
		if(!_mm.validate(formData.username,'require')){
			result.msg = '用户名不能为空';
			return result;
		};
		if(!_mm.validate(formData.password,'require')){
			result.msg = '密码不能为空';
			return result;
		};
		//验证密码的长度
		if(formData.password.length < 6){
			result.msg = '密码长度不能少于六位';
			return result;
		};
		//验证两次输入的密码是否一致
		if(formData.password !== formData.passwordConfirm){
			result.msg = '密码不一致';
			return result;
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
	}
};


$(function(){
	page.init();
})
