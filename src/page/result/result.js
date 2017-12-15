/*
* @Author: Administrator
* @Date:   2017-12-14 19:28:57
* @Last Modified by:   leon
* @Last Modified time: 2017-12-16 01:01:01
*/

require('./result.css');
require('page/common/nav-simple/nav-simple.js');

var _mm = require('util/mm.js');


$(function () {
	var type = _mm.getUrlParam('type') || 'default',
		$element = $('.'+ type + '-success' );

	$element.show();
})