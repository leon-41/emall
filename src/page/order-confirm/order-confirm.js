/*
* @Author: leon
* @Date:   2017-12-19 02:53:55
* @Last Modified by:   leon
* @Last Modified time: 2017-12-19 23:27:56
*/
require('./order-confirm.css')
require('page/common/nav/nav.js')
require('page/common/header/header.js')

var _mm 			= require('util/mm.js');
var _product 		= require('service/product-service.js');
var _cart	 		= require('service/cart-service.js');
var _order  		= require('service/order-service.js');
var _address  		= require('service/address-service.js');
var templateAddress	= require('./address-list.string');
var templateProduct	= require('./order.string');
var addressModel    = require('./address-model.js');
var page = {
	data : {
		selectedId : null,
	},

	init : function (argument) {
		this.onLoad();
		this.bindEvent();
	},

	onLoad : function(){
		this.loadAddressList();
		this.loadProductList();
	},

	bindEvent : function(){
		var _this = this;

		//地址的选择
		$(document).on('click','.address-item',function(){
			$(this).addClass('active')
				.siblings('.address-item').removeClass('active');
			_this.data.selectedId = $(this).data('id');
		});
		//订单的提交
		$(document).on('click','.order-submit',function(){
			var shippingId = _this.data.selectedId;
			if(shippingId){
				_order.createOrder({
					shippingId : shippingId
					},
					function(res){
						window.location.href = './payment.html?orderNumber=' + res.orderNo;
					},
					function(err){
						_mm.errorTip(err);
					}
				);
			}else{
				_mm.errorTip('请选择地址后提交！')
			}

		});

		//添加地址
		$(document).on('click','.address-add',function(){
			addressModel.show({
				isUpdate : false,
				onSuccess : function(){
					_this.loadAddressList();
				}
			});
		});

		//修改地址
		$(document).on('click','.address-update',function(e){
			//阻止事件的冒泡
			e.stopPropagation();
			
			var shippingId = $(this).parents('.address-item').data('id');
			_address.getAddress(shippingId,
				function(res){
					addressModel.show({
						isUpdate : true,
						data 	 : res, 
						id 		 : shippingId,
						onSuccess : function(){
							_this.loadAddressList();
						}
					});
				},
				function(err){
					_mm.errorTip(err)
				}
			);
			
		});

		//删除地址
		$(document).on('click','.address-delete',function(e){
			e.stopPropagation();
			var shippingId = $(this).parents('.address-item').data('id');
			if(window.confirm('确认要删除该地址吗？')){
				_address.deleteAddress(shippingId,
					function(res){
						_this.loadAddressList();
					},
					function(err){
						_mm.errorTip(err);
					}
				)
			}
		});
	},
	// 加载地址列表
	loadAddressList : function(){
		var _this = this;
		$('.address-con').html('<div class="loading"><div>');
		_address.getAddressList(
			function(res){
				_this.addressFilter(res);
				var addressHtml = _mm.renderHtml(templateAddress,res);
				$('.address-con').html(addressHtml);
			},
			function(err){
				$('.address-con').html('<p class="err-tip">地址加载失败，请刷新后重试</p>');
			}
		);
	},
	// 处理地址列表的选中状态
	addressFilter : function(data){
		if(this.data.selectedId){
			var selectedIdFlag = false;
			for(var i=0, length=data.list.length; i<length; i++){
				if(data.list[i].id === this.data.selectedId){
					data.list[i].isActived = true;
					selectedIdFlag = true;
				}
			}
			if(!selectedIdFlag){
				// 如果之前选中的地址不在列表中就删除
				this.data.selectedId = null;
			}
		}
	},

	// 加载商品清单
	loadProductList : function(){
		$('.product-con').html('<div class="loading"><div>');
		_order.getProductList(
			function(res){
				var productHtml = _mm.renderHtml(templateProduct,res);
				$('.product-con').html(productHtml);
			},
			function(err){
				$('.product-con').html('<p class="err-tip">订单加载失败，请刷新后重试</p>');
			}
		);
	},

};
$(function(){
	page.init();
})