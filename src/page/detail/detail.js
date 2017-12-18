/*
* @Author: leon
* @Date:   2017-12-17 18:38:25
* @Last Modified by:   leon
* @Last Modified time: 2017-12-18 01:18:08
*/
require('./detail.css')
require('page/common/nav/nav.js');
require('page/common/header/header.js')

var _mm 			= require('util/mm.js');
var _product 		= require('service/product-service.js');
var _cart	 		= require('service/cart-service.js');
var templateIndex	= require('./detail.string');

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
		if(!this.data.productId){
			_mm.goHome();
		}
		this.loadDetail();
	},
	bindEvent : function(){
		var _this = this;
		
		// 使用时间代理方式绑定事件
		// 图片预览 hover mouseenter mouseout mouseover 根据实际效果选择
		$(document).on('mouseenter','.p-img-item',function(){
			// 取出当前元素的src属性的值
			var imgUrl = $(this).find('.p-img').attr('src');
			$('.main-img').attr('src',imgUrl);
		});
		
		// count操作
		$(document).on('click','.p-count-btn',function(){
			var type    = $(this).hasClass('plus') ? 'plus' : 'minus',
				$pCount = $('.p-count'),
				currentCount = parseInt($pCount.val()),
				minCount = 1,
				maxCount = _this.data.detailInfo.stock || 1;
			if(type === 'plus'){
				$pCount.val(currentCount < maxCount ? currentCount + 1 : maxCount );
			}else{
				$pCount.val(currentCount > minCount ? currentCount - 1 : minCount );
			}

		});

		//加入购物车
	    $(document).on('click','.btn.cart-add',function(){
			_cart.addToCart({
					productId : _this.data.productId,
					count     : $('.p-count').val()
				},
				function(res){
					window.location.href = "./result.html?type=cart-add";
				},
				function(err){
					_mm.errTip(err);
				}
			);	
		});		
	},

	// 加载list数据
	loadDetail : function(){
		var html 	  = '',
			_this	  = this,
			$pageWrap = $('.page-wrap');
		// loading
		$pageWrap.html('<div class="loading"></div>')

		// 请求商品信息
		_product.getProductDetail(this.data.productId,
			function(res){
				_this.filter(res);
				_this.data.detailInfo = res;
				html = _mm.renderHtml(templateIndex,res);
				$pageWrap.html(html);
			},
			function(err){
				$pageWrap.html("<p class='err-tip'>找不到此商品</p>");
			}
		);
	},


	// 过滤数据  此处的data 为引用类型 修改过后直接生效
	filter : function(data){
		data.subImages = data.subImages.split(',');
	},
		
};


$(function(){
	page.init();
})