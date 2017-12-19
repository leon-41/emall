/*
* @Author: leon
* @Date:   2017-12-19 03:05:21
* @Last Modified by:   leon
* @Last Modified time: 2017-12-20 02:43:10
*/
'use strict'

var _mm = require('util/mm.js');

var _order = {
	//获取
	getProductList : function (resolve,reject) {
		_mm.request({
			url 	: _mm.getServerUrl('/order/get_order_cart_product.do'),
			success	: resolve,
			error	: reject
		})
	},
	// 创建订单
	createOrder : function (orderInfo,resolve,reject) {
		_mm.request({
			url 	: _mm.getServerUrl('/order/create.do'),
			method	: 'POST',
			data 	: orderInfo,
			success	: resolve,
			error	: reject
		})
	},
	//获取订单列表
	getOrderList : function (listParam,resolve,reject) {
		_mm.request({
			url 	: _mm.getServerUrl('/order/list.do'),
			method	: 'POST',
			data 	: listParam,
			success	: resolve,
			error	: reject
		})
	},
	// 获取订单详情
	getOrderDetail :  function (orderNumber,resolve,reject) {
		_mm.request({
			url 	: _mm.getServerUrl('/order/detail.do'),
			method	: 'POST',
			data 	: {
				orderNo : orderNumber
			},
			success	: resolve,
			error	: reject
		})
	},
	//取消订单
	cancelOrder :  function (orderNumber,resolve,reject) {
		_mm.request({
			url 	: _mm.getServerUrl('/order/cancel.do'),
			method	: 'POST',
			data 	: {
				orderNo : orderNumber
			},
			success	: resolve,
			error	: reject
		})
	},


};

module.exports = _order;