/*
* @Author: Administrator
* @Date:   2017-12-14 19:28:57
* @Last Modified by:   leon
* @Last Modified time: 2017-12-20 05:16:14
*/

require('./result.css');
require('page/common/nav-simple/nav-simple.js');

var _mm = require('util/mm.js');


$(function () {
	var type = _mm.getUrlParam('type') || 'default',
		$element = $('.'+ type + '-success' );

	if(type === 'payment'){
		var $orderNumber = $element.find('.order-number'),
		    orderNumber  = _mm.getUrlParam('orderNumber');

		$orderNumber.attr('href',$orderNumber.attr('href')+orderNumber);
	}
	$element.show();
})