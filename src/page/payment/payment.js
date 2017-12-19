/*
* @Author: leon
* @Date:   2017-12-20 03:32:14
* @Last Modified by:   leon
* @Last Modified time: 2017-12-20 05:03:50
*/
require('./payment.css')
require('page/common/nav/nav.js')
require('page/common/header/header.js')

var _mm 			= require('util/mm.js');
var _payment 		= require('service/payment-service.js');
var templateIndex	= require('./payment.string');

//page逻辑部分 显示一个用户信息
var page = {
	data :{
		orderNumber : _mm.getUrlParam('orderNumber'),
	},

	init : function () {
		this.onLoad();
	},
	onLoad : function(){		
		//加载detail数据
		this.loadPaymentInfo();
	},

	// 加载订单支付详情
	loadPaymentInfo : function(){
		var _this 		 = this,
			paymentHtml  = '',
			$pageWrap	 = $('.page-wrap');
		
		$pageWrap.html('<div class="loading"></div>');

		_payment.getPaymentInfo(this.data.orderNumber,
			function(res){

				// 渲染html
				paymentHtml = _mm.renderHtml(templateIndex,res)
				$pageWrap.html(paymentHtml);

				// 监听订单状态
				_this.listenOrderStatus();

			},
			function(err){
				_mm.errorTip(err);
				$pageWrap.html('<p class="err-tip">' + err + '</p>')
			}
		);
	},


	// 监听订单状态  通过setInterval() 来实现轮询
	listenOrderStatus : function(){
		var _this = this;

		this.paymentTimer = window.setInterval(function(){
			_payment.getPaymentStatus(_this.data.orderNumber,
				function(res){
					if(res === true){
						window.location.href = './result.html?type=payment&orderNumber=' + _this.data.orderNumber;
					}
				},
				function (err) {
					
				}
			);

		}, 5e3)

	}
	
};


$(function(){
	page.init();
})
