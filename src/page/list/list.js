/*
* @Author: leon
* @Date:   2017-12-16 20:46:48
* @Last Modified by:   leon
* @Last Modified time: 2017-12-17 18:35:20
*/

require('./list.css')
require('page/common/nav/nav.js');
require('page/common/header/header.js')

var _mm 			= require('util/mm.js');
var _product 		= require('service/product-service.js');
var templateIndex	= require('./list.string');
var Pagination 		= require('util/pagination/pagination.js');

//list page逻辑部分 
var page = {
	data : {
		listParam : {
			keyword    : _mm.getUrlParam('keyword') 	|| '',
			categoryId : _mm.getUrlParam('categoryId') 	|| '',
			orderBy    : _mm.getUrlParam('orderBy') 	|| 'default',
			pageNum    : _mm.getUrlParam('pageNum') 	|| 1,
			pageSize   : _mm.getUrlParam('pageSize') 	|| 2,
		}
	},
	init : function () {
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
		// 初始化
		this.loadList();
	},
	bindEvent : function(){
		var _this = this;
		
		// 排序的点击
		$('.sort-item').click(function(){
			_this.data.listParam.pageNum = 1;
			//缓存$(this)
			var $this = $(this);
			if($this.data('type') === 'default'){
				//已经是active样式
				if($this.hasClass('active')){
					return;
				}
				else{
					$this.addClass('active').siblings('.sort-item')
						.removeClass('active asc desc');
					_this.data.listParam.orderBy = 'default';
				}
			}
			// 点击价格排序
			else if($this.data('type') === 'price'){
				// active class的处理
				$this.addClass('active').siblings('.sort-item')
						.removeClass('active asc desc');
				// 升序、降序的处理
				if(!$this.hasClass('asc')){
					$this.addClass('asc').removeClass('desc');
					_this.data.listParam.orderBy = 'price_asc';
				}else{
					$this.addClass('desc').removeClass('asc');
					_this.data.listParam.orderBy = 'price_desc';
				}
			}
			_this.loadList();
		});
		
		
	},

	// 加载list数据
	loadList : function(){
		var _this 	   = this,
			 listHtml  = '',
			 listParam = this.data.listParam,
			 $pListCon = $('.p-list-con');
		$pListCon.html('<li class="loading"></li>');
		// 删除参数中不必要的字段
		listParam.categoryId ? (delete listParam.keyword) : (delete listParam.categoryId) ;
		// 请求接口
		_product.getProductList(listParam,
			function(res){
				listHtml = _mm.renderHtml(templateIndex,
					{list : res.list}
				);
				$pListCon.html(listHtml);
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
			}
		);
	},

	// 封装一个组件的时候，有类 和 对象 两种方式

	// 加载分页信息
	loadPagination : function(pageInfo){
		// 这种用 new 的方式就是在实现的时候要用一个类(function)的形式来写 
		// 不能用之前的对象的那种方式
		this.pagination ? '' : (this.pagination = new Pagination());
		var _this = this;
		this.pagination.render($.extend({},pageInfo,{
			container 	 : $('.pagination'),
			onSelectPage : function(pageNum){
				_this.data.listParam.pageNum = pageNum;
				_this.loadList();
			}
		}));
	},
		
};


$(function(){
	page.init();
})