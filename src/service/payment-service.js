/*
* @Author: leon
* @Date:   2017-12-20 04:34:36
* @Last Modified by:   leon
* @Last Modified time: 2017-12-20 05:02:46
*/
'use strict'

var _mm = require('util/mm.js');

var _payment = {

	//获取支付信息
	getPaymentInfo : function (orderNumber,resolve,reject) {
		_mm.request({
			url 	: _mm.getServerUrl('/order/pay.do'),
			data	: {
				orderNo : orderNumber
			},
			success	: resolve,
			error	: reject
		})
	},
	// 查询订单支付状态
	getPaymentStatus : function (orderNumber,resolve,reject) {
		_mm.request({
			url 	: _mm.getServerUrl('/order/query_order_pay_status.do'),
			data	: {
				orderNo : orderNumber
			},
			success	: resolve,
			error	: reject
		})
	},
	


};

module.exports = _payment;