/*
* @Author: Administrator
* @Date:   2017-12-14 19:28:57
* @Last Modified by:   Administrator
* @Last Modified time: 2017-12-14 20:54:53
*/

require('./result.css');
require('page/common/nav-simple/index.js');

var _mm = require('util/mm.js');


$(function () {
	var type = _mm.getUrlParam('type') || 'default',
		$element = $('.'+ type + '-success' );

	$element.show();
})