/*
* @Author: leon
* @Date:   2017-12-18 18:47:34
* @Last Modified by:   leon
* @Last Modified time: 2017-12-19 02:56:28
*/
require('./cart.css')

require('page/common/header/header.js')

var _mm 			= require('util/mm.js');
var _product 		= require('service/product-service.js');
var _cart	 		= require('service/cart-service.js');
var templateIndex	= require('./cart.string');
var nav 			= require('page/common/nav/nav.js');

//list page逻辑部分 
var page = {
	data : {
		productId : _mm.getUrlParam('productId') || '',
	},
	init : function () {
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
		this.loadCart();
	},
	bindEvent : function(){
		var _this = this;
		
		// 商品的选择与取消选择
		$(document).on('click','.cart-select' ,function(){
			var $this 	  = $(this),
				productId  = $this.parents('.cart-table').data('product-id');

			if($this.is(':checked')){
				_cart.selectProduct(productId,
					function(res){
						_this.renderCart(res);
					},
					function(err){
						_this.showCartError(err);
					}
				);
			}else{
				_cart.unselectProduct(productId,
					function(res){
						_this.renderCart(res);
					},
					function(err){
						_this.showCartError(err);
					}
				);
			}					
		});
		// 商品的全选与取消全选
		$(document).on('click','.cart-select-all' ,function(){
			var $this 	  = $(this);

			if($this.is(':checked')){
				_cart.selectAll(
					function(res){
						_this.renderCart(res);
					},
					function(err){
						_this.showCartError(err);
					}
				);
			}else{
				_cart.unselectAll(
					function(res){
						_this.renderCart(res);
					},
					function(err){
						_this.showCartError(err);
					}
				);
			}			
		});
		// 更新商品数量
		$(document).on('click','.count-btn' ,function(){
			var $this     = $(this),
				productId = $this.parents('.cart-table').data('product-id'),
				$pCount   =	$this.siblings('.count-input'),
				currCount = parseInt($pCount.val()),
				type 	  = $this.hasClass('plus') ? 'plus' : 'minus',
				minCount  = 1,
				maxCount  = parseInt($pCount.data('max')),
				newCount  = 0; 

			if(type === 'plus'){
				if(currCount>=maxCount){
					_mm.errorTip('该商品数量达到上限');
					return;
				}
				newCount = currCount + 1;
			}
			else if(type='minus'){
				if(currCount<=minCount){
					return;
				}
				newCount = currCount - 1;
			}

			_cart.upadateCart(
				{
					productId : productId,
					count 	  : newCount
				},
				function(res){
					_this.renderCart(res);
				},
				function(err){
					_this.showCartError();
				}
			);	
		});

		// 删除单个商品
		$(document).on('click','.cart-delete' ,function(){
			if(window.confirm('确认要删除该商品？')){
				var productId = $(this).parents('.cart-table').data('product-id');
				_this.deleteCartProduct(productId);
			}
		});

		// 删除选中商品
		$(document).on('click','.delete-con' ,function(){
			if(window.confirm('确认要删除选中的商品？')){
				var arrProducts = [],
					seletedItem = $('.cart-select:checked');

				// 查找选中的productIds
				for(var i=0;i<seletedItem.length;i++){
					arrProducts.push($(seletedItem[i]).parents('.cart-table').data('product-id')); 
				}

				if(arrProducts.length){
					// 用分割符拼接字符串
					_this.deleteCartProduct(arrProducts.join(','));
				}else{
					_mm.errorTip('您还没有选择需要删除的商品');
				}
			}
		});

		// 提交购物车
		$(document).on('click','.btn-submit' ,function(){

			// 价格大于0 进行提交
			if(_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0){
				window.location.href = './order-confirm.html';
			}else{
				_mm.errorTip('请选择商品后去提交');			
			}
		});
	},

	// 加载购物车数据
	loadCart : function(){
		var _this = this;
		_cart.getCartList(
			function(res){
				_this.renderCart(res);
			},
			function(err){
				_this.showCartError();
			})
	},
	// 删除指定商品 支持批量 用productId 逗号分割
	deleteCartProduct : function(productIds){
		var _this = this;
		_cart.deleteProduct(productIds,
			function(res){
				_this.renderCart(res);
			},
			function(err){
				_this.showCartError();
			}
		);
	},


	// 渲染购物车
	renderCart : function(data){
		this.filter(data);
		// 缓存购物车信息
		this.data.cartInfo = data;

		var cartHtml = '';
		cartHtml =  _mm.renderHtml(templateIndex,data);
		$('.page-wrap').html(cartHtml);

		//通知导航的购物车更新数量 需要调用导航条模块的内部方法
		//nav模块的init方法中会return this    该模块的模块输出为 module.exports=nav.init();
		// 该模块的输出为对象本身
		nav.loadCartCount();
	},

	//判断数据是否为空
	filter : function(data){
		data.notEmpty = !!data.cartProductVoList.length;
	},
	//显示错误信息
	showCartError : function(){
		$('.page-wrap').html('<p class="err-tip"><span>哪里不对了，刷新下试试</span></p>');
	}
		
};


$(function(){
	page.init();
})