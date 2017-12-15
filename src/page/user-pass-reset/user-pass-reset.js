/*
* @Author: leon
* @Date:   2017-12-15 20:02:32
* @Last Modified by:   leon
* @Last Modified time: 2017-12-16 01:00:47
*/
"use strict"
require('page/common/nav-simple/nav-simple.js');
require('./user-pass-reset.css');

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
	//用以暂存数据
	data : {
		username : '',
		question : '',
		answer : '',
		token : '',
	},

	init : function () {
		this.onload();
		this.bindEvent();
	},
	onload : function(){
		this.loadStepUsername();
	},
	bindEvent : function(){
		var _this = this;
		//用户名的提交
		$('#submit-username').click(function(){
			_this.submitUsername(_this);
		});
		// 如果按下回车也会提交
		$('.username-content').keyup(function(e){
			if(e.keyCode === 13){
				_this.submitUsername(_this);
			}
		});
		//密保问题答案的的提交
		$('#submit-question').click(function(){
			_this.submitAnswer(_this);
		});
		$('.question-content').keyup(function(e){
			if(e.keyCode === 13){
				_this.submitAnswer(_this);
			}
		});
		//密保问题答案的的提交
		$('#submit-password').click(function(){
			_this.submitPassword(_this);
		});
		$('.password-content').keyup(function(e){
			if(e.keyCode === 13){
				_this.submitPassword(_this);
			}
		});


	},

	//提交用户名 
	submitUsername : function(_this){
		var username = $.trim($('#username').val());
		if(username){
			_user.getQuestion(username,
				//用户名存在
				function(res){
					_this.data.username = username;
					_this.data.question = res;
					_this.loadStepQuestion();
				},
				// 用户名不存在
				function(err){
					formError.show(err);
				}
			)
		}else{
			formError.show('请输入用户名');
		}
	},
	//提交密保问题答案
	submitAnswer : function(_this){
		var answer = $.trim($('#answer').val());
		var data = {
			username : _this.data.username,
			question : _this.data.question,
			answer 	 : answer
		};
		if(answer){
			_user.checkAnswer(data,
				//答案正确
				function(res){
					_this.data.answer = answer;
					_this.data.token = res;
					_this.loadStepPassword();
				},
				// 答案错误
				function(err){
					formError.show(err);
				}
			)
		}else{
			formError.show('请输入答案！');
		}

	},
	//提交新密码
	submitPassword : function(_this){
		var password = $.trim($('#password').val());
		var data = {
			username 	: _this.data.username,
			passwordNew : password,
			forgetToken : _this.data.token
		}

		if(password){
			if(password.length < 6){
				formError.show('密码长度不小于6位');
				return;
			};
			_user.resetPassword(data,
				//密码修改成功
				function(res){
					window.location.href =  './result.html?type=pass-reset';
				},
				//密码修改不成功
				function(err){
					formError.show(err);
				}
			)
		}else{
			formError.show('请输入新密码！');
		}

	},
	//加载输入用户名
	loadStepUsername : function(){
		$('.step-username').show();
	},
	//加载输入密码提示问题答案的一步
	loadStepQuestion : function(){
		formError.hide();
		$('.step-username').hide()
		.siblings('.step-question').show()
		.find('.question').text(this.data.question);

	},
	//加载输入密码
	loadStepPassword : function(){
		formError.hide();
		$('.step-question').hide()
		.siblings('.step-password').show();
	}
	
};


$(function(){
	page.init();
})
