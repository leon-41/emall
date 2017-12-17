/*
* @Author: Administrator
* @Date:   2017-12-12 06:23:20
* @Last Modified by:   leon
* @Last Modified time: 2017-12-16 20:40:10
*/

'use strict'
//导入jQuery
// var $ = require('jquery');
// $('body').html("HELLO");

// require('../module.js');
// require('./index.css');
// console.log('hellp index');


var _mm = require('util/mm.js');

_mm.request({
	url:'./test.do',
	// url : 'happymmall.com/product/list.do?keyword=1',
	success: function(res) {
		console.log(res);
	},
	error: function(err) {
		console.log(err);
	}
});

console.log(_mm.getUrlParam('test'));


//用hogan来渲染html
// var html = '<div>{{data}}</div>';
// var data = {
// 	data : 123
// };
// console.log(_mm.renderHtml(html,data));


require('page/common/nav/nav.js');
require('page/common/nav-side/nav-side.js');
// var navSide = require('page/common/nav-side/nav-side.js');

require('page/common/header/header.js');
require('./index.css');

var templateBanner = require('util/slider/slider.string');
require('util/slider/slider.js');

$(function() {
	//渲染bannar的html
	var bannerHtml = _mm.renderHtml(templateBanner);
	$('.banner-con').html(bannerHtml);
	// 初始化banner
    var $slider = $('.banner').unslider({
    	dots : true
    });
    // 前一张和后一张操作的事件绑定
    $('.banner-arrow').click(function(){
    	var forward = $(this).hasClass('prev') ? 'prev' : 'next';
    	$slider.data('unslider')[forward]();
    })
});