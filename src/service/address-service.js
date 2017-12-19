/*
* @Author: leon
* @Date:   2017-12-19 04:11:33
* @Last Modified by:   leon
* @Last Modified time: 2017-12-19 23:07:08
*/
'use strict'

var _mm = require('util/mm.js');

var _address = {
	//获取购物车数量
	getAddressList : function (resolve,reject) {
		_mm.request({
			url 	: _mm.getServerUrl('/shipping/list.do'),
			data	: {
				pageSize : 50
			},
			success	: resolve,
			error	: reject
		})
	},
	//获取单个地址
	getAddress : function (shippingId,resolve,reject) {
		_mm.request({
			url 	: _mm.getServerUrl('/shipping/select.do'),
			data	: {
				shippingId : shippingId
			},
			success	: resolve,
			error	: reject
		})
	},
	// 新建地址
	save : function (addressInfo,resolve,reject) {
		_mm.request({
			url 	: _mm.getServerUrl('/shipping/add.do'),
			method	: 'POST',
			data 	: addressInfo,
			success	: resolve,
			error	: reject
		})
	},
	// 更新地址
	update : function (addressInfo,resolve,reject) {
		_mm.request({
			url 	: _mm.getServerUrl('/shipping/update.do'),
			method	: 'POST',
			data 	: addressInfo,
			success	: resolve,
			error	: reject
		})
	},
	// 删除地址
	deleteAddress : function (shippingId,resolve,reject) {
		_mm.request({
			url 	: _mm.getServerUrl('/shipping/del.do'),
			method	: 'POST',
			data 	: {
				shippingId : shippingId
			},
			success	: resolve,
			error	: reject
		})
	},

};

module.exports = _address;