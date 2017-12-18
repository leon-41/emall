/*
* @Author: Administrator
* @Date:   2017-12-14 03:04:46
* @Last Modified by:   leon
* @Last Modified time: 2017-12-19 00:02:05
*/
'use strict'

var _mm = require('util/mm.js');

var _cart = {
	//获取购物车数量
	getCartCount : function (resolve,reject) {
		_mm.request({
			url 	: _mm.getServerUrl('/cart/get_cart_product_count.do'),
			success	: resolve,
			error	: reject
		})
	},
	// 加入购物车
	addToCart : function (cartInfo,resolve,reject) {
		_mm.request({
			url 	: _mm.getServerUrl('/cart/add.do'),
			method	: 'POST',
			data 	: cartInfo,
			success	: resolve,
			error	: reject
		})
	},
	// 获取购物车列表
	getCartList : function (resolve,reject) {
		_mm.request({
			url 	: _mm.getServerUrl('/cart/list.do'),
			success	: resolve,
			error	: reject
		})
	},
	
	//选中商品
	selectProduct : function (productId,resolve,reject) {
		_mm.request({
			url 	: _mm.getServerUrl('/cart/select.do'),
			method	: 'POST',
			data 	:{productId : productId},
			success	: resolve,
			error	: reject
		})
	},
	//取消选中商品
	unselectProduct : function (productId,resolve,reject) {
		_mm.request({
			url 	: _mm.getServerUrl('/cart/un_select.do'),
			method	: 'POST',
			data 	: {productId : productId},
			success	: resolve,
			error	: reject
		})
	},

	// 购物车全选
	selectAll : function (resolve,reject) {
		_mm.request({
			url 	: _mm.getServerUrl('/cart/select_all.do'),
			success	: resolve,
			error	: reject
		})
	},

	//取消全选
	unselectAll : function (resolve,reject) {
		_mm.request({
			url 	: _mm.getServerUrl('/cart/un_select_all.do'),
			success	: resolve,
			error	: reject
		})
	},

	// 更新商品信息
	upadateCart : function (cartInfo,resolve,reject) {
		_mm.request({
			url 	: _mm.getServerUrl('/cart/update.do'),
			method	: 'POST',
			data 	: cartInfo,
			success	: resolve,
			error	: reject
		})
	},

	deleteProduct : function (productIds,resolve,reject) {
		_mm.request({
			url 	: _mm.getServerUrl('/cart/delete_product.do'),
			method	: 'POST',
			data 	: {productIds : productIds},
			success	: resolve,
			error	: reject
		})
	},
};

module.exports = _cart;