/*
* @Author: leon
* @Date:   2017-12-20 01:25:57
* @Last Modified by:   leon
* @Last Modified time: 2017-12-20 02:46:05
*/
require('./order-detail.css')
require('page/common/nav/nav.js')
require('page/common/header/header.js')


var navSide = require('page/common/nav-side/nav-side.js');

var _mm 			= require('util/mm.js');
var _order 			= require('service/order-service.js');
var templateIndex	= require('./order-detail.string');

//page逻辑部分 显示一个用户信息
var page = {
	data :{
		orderNumber : _mm.getUrlParam('orderNumber'),
	},

	init : function () {
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
		// 初始化左侧菜单
		navSide.init({
			name : 'order-list'
		});
		//加载detail数据
		this.loadOrderDetail();
	},

	bindEvent : function(){
		var _this = this;
		$(document).on('click','.order-cancel',function(){
			if(window.comfirm('确认要取消该订单吗？')){
				_order.cancelOrder(_this.data.orderNumber,
					function(res){
						_mm.successTip('该订单取消成功');
						_this.loadOrderDetail();
					},
					function(err){
						_mm.errorTip(err);
					}
				)
			}		
		})
	},


	// 加载订单详情
	loadOrderDetail : function(){
		var _this 		    = this,
			orderDetailHtml = '',
			$content	    = $('.content');
		
		$content.html('<div class="loading"></div>');

		_order.getOrderDetail(this.data.orderNumber,
			function(res){
				_this.dataFilter(res);

				// 渲染html
				orderDetailHtml = _mm.renderHtml(templateIndex,res)
				$content.html(orderDetailHtml);
			},
			function(err){
				_mm.errorTip(err);
				$content.html('<p class="err-tip">' + err + '</p>')
			}
		);
	},
	dataFilter : function(data){
		data.needPay      = data.status === 10;
		data.isCancelable = data.status === 10;
	}
};


$(function(){
	page.init();
})
