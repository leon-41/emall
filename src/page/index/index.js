/*
* @Author: Administrator
* @Date:   2017-12-12 06:23:20
* @Last Modified by:   Administrator
* @Last Modified time: 2017-12-14 06:39:38
*/

'use strict'

// var $ = require('jquery');
// $('body').html("HELLO");

// $('body').html("HELLO index");

// var $$ = require('jquery');
// $$('body').html("HELLO");

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
var html = '<div>{{data}}</div>';
var data = {
	data : 123
};
console.log(_mm.renderHtml(html,data));

// require('../common/nav-simple/index.js');
// require('page/common/nav-simple/index.js');
require('page/common/nav/nav.js');
require('page/common/nav-side/nav-side.js');
// var navSide = require('page/common/nav-side/nav-side.js');

require('page/common/header/header.js')