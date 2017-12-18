/*
* @Author: leon
* @Date:   2017-12-17 00:58:32
* @Last Modified by:   leon
* @Last Modified time: 2017-12-17 18:21:34
*/
'use strict'
require('./pagination.css');
var _mm = require('util/mm.js');
var templatePagination = require('./pagination.string');

var Pagination = function (argument) {
	var _this = this;
	this.defaultOption = {
		container 	 : null,
		pageNum		 : 1,
		pageRange	 : 3,
		onSelectPage : null
	};
	// 事件处理
	// 由于pagination这个组件在使用的时候是采用了构造函数的方式  在创造它时需要调用其构造函数Paginaation
	// 因此需要用事件代理的方式  不能用事件绑定  假设使用了事件绑定的话（先绑定事件。。再加载html 。。那么是无效的）
	$(document).on('click','.pg-item',function(){
		var $this = $(this);
		//对于active 和 disabled 按钮点击不作处理
		if ($this.hasClass('active') || $this.hasClass('disabled')) {
			return;
		}
		typeof _this.option.onSelectPage === 'function' ? _this.option.onSelectPage($this.data('value')) : null;
	})
}

// 封装一个组件的时候，有类 和 对象 两种方式

//通过原型链继承的方法  添加render 渲染分页组件
Pagination.prototype.render = function(userOption) {
	//合并选项
	this.option = $.extend({},this.defaultOption,userOption);
	// 判断容器是否为合法的jQuery对象
	if(!(this.option.container instanceof jQuery)){
		return;
	}
	// 判断是否只有一页
	if(this.option.pages <= 1){
		return;
	}
	// 渲染分页内容
	this.option.container.html(this.getPaginationHtml());
};

// 获取分页的html  |上一页| 1 2 3 4 5|下一页| 5/6
Pagination.prototype.getPaginationHtml = function(userOption) {
	var html 	  = '',
		option    = this.option,
		pageArray = [],
		start	  = option.pageNum - option.pageRange > 0 ? option.pageNum - option.pageRange : 1,
		end       = option.pageNum + option.pageRange < option.pages ? option.pageNum + option.pageRange : option.pages;

	// 上一页按钮的数据
	pageArray.push({
		name  	 : '上一页',
		value 	 : option.prePage,
		disabled : !option.hasPreviousPage
	});

	for(var i = start ; i <= end; i++){
		pageArray.push({
			name  	 : i,
			value 	 : i,
			active	 : (i === option.pageNum)
		});
	}
	// 下一页按钮的数据
	pageArray.push({
		name  	 : '下一页',
		value 	 : option.nextPage,
		disabled : !option.hasNextPage
	});
	//
	html = _mm.renderHtml(templatePagination,{
		pageArray : pageArray,
		pageNum   : option.pageNum,
		pages     : option.pages
	});
	return html;
};

module.exports = Pagination;