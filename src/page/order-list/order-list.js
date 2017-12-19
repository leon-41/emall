/*
* @Author: leon
* @Date:   2017-12-19 23:33:20
* @Last Modified by:   leon
* @Last Modified time: 2017-12-20 01:38:34
*/
require('./order-list.css')
require('page/common/nav/nav.js')
require('page/common/header/header.js')


// require('page/common/nav-side/nav-side.js');
var navSide = require('page/common/nav-side/nav-side.js');

var _mm 			= require('util/mm.js');
var _order 			= require('service/order-service.js');
var Pagination 		= require('util/pagination/pagination.js');
var templateIndex	= require('./order-list.string');

//page逻辑部分 显示一个用户信息
var page = {
	data :{
		listParam : {
			pageNum  : 1,
			pageSize : 2
		}
	},

	init : function () {
		this.onLoad();
	},
	onLoad : function(){
		// 初始化左侧菜单
		navSide.init({
			name : 'order-list'
		});
		this.loadOrderList();
	},

	// 加载订单列表
	loadOrderList : function(){
		var _this 		  = this,
			orderListHtml = '',
			$listCon	  = $('.order-list-con');
		$listCon.html('<div class="loading"></div>');
		_order.getOrderList(this.data.listParam,
			function(res){

				// 渲染html
				orderListHtml = _mm.renderHtml(templateIndex,res)
				$listCon.html(orderListHtml);

				// 加载分页信息
				_this.loadPagination({
					hasPreviousPage : res.hasPreviousPage,
					prePage 		: res.prePage,
					hasNextPage 	: res.hasNextPage,
					nextPage 		: res.nextPage,
					pageNum 		: res.pageNum,
					pages 			: res.pages,
				});
			},
			function(err){
				_mm.errorTip(err);
				$listCon.html('<p class="err-tip">加载订单失败，请刷新后重试</p>')
			}
		);
	},


	// 加载分页信息
	loadPagination : function(pageInfo){
		// 这种用 new 的方式就是在实现的时候要用一个类(function)的形式来写 
		// 不能用之前的对象的那种方式
		this.pagination ? '' : (this.pagination = new Pagination());
		var _this = this;
		this.pagination.render(
			$.extend({},pageInfo,{
				container 	 : $('.pagination'),
				onSelectPage : function(pageNum){
					_this.data.listParam.pageNum = pageNum;
					_this.loadOrderList();
				}
			})
		);
	},
};


$(function(){
	page.init();
})
