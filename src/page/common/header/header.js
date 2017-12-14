/*
* @Author: Administrator
* @Date:   2017-12-14 03:36:05
* @Last Modified by:   Administrator
* @Last Modified time: 2017-12-14 04:28:23
*/
'use strict'
require('./header.css')

var _mm   = require('util/mm.js');

//通用页面头部
var header = {
	init : function() {
		this.bindEvent();
	},

	onLoad : function(){
		var keyword = _mm.getUrlParam('keyword');
		//keyword存在 则回填输入框
		if (keyword) {
			$('#search-input').val(keyword);
		}
	},

	bindEvent : function(){
		var _this = this;

		//点击搜索按钮 做所搜提交
		$('#search-btn').click(function(){
			_this.searchSubmit();
		})

		//输入回车后，做搜索提交
		$('#search-input').keyup(function(e){
			//13是回车键的KeyCode
			if(e.keyCode === 13){
				_this.searchSubmit();
			};
		});
	},

	searchSubmit : function(){
		var keyword = $.trim($('#search-input').val());
		
		//如果提交时有keyword，正常跳转到list页
		if(keyword){
			window.location.href = './list.html?keyword=' + keyword;
		}
		//keyword为空，直接返回首页
		else{
			_mm.goHome();
		}
	},
};

header.init();