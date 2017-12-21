/*
* @Author: leon
* @Date:   2017-12-19 18:51:11
* @Last Modified by:   leon
* @Last Modified time: 2017-12-21 21:36:40
*/

var _mm 			= require('util/mm.js');
var _cities			= require('util/cities/cities.js');
var _address  		= require('service/address-service.js');
var templateAddress	= require('./address-model.string');

var addressModel = {
	
	show : function (option) {
		//option的邦定
		this.option = option;
		this.option.data = option.data || {};
		this.$modelWrap = $('.model-wrap');
		// 渲染页面
		this.loadModal();
		//绑定事件
		this.bindEvent();
	},

	hide : function() {
		this.$modelWrap.empty();
	},

	bindEvent : function(){
		var _this = this;

		// 这里绑定的是change事件 省份选项的改变来触发
		this.$modelWrap.find('#receiver-province').change(function(){
			var selectProvince = $(this).val();
			_this.loadCities(selectProvince);
		})
		// 提交新的地址
		$('.address-btn').click(function(){
			var receiverInfo = _this.getReceiverInfo(),
				isUpdate	 = _this.option.isUpdate;
			//使用新地址且验证通过
			if(!isUpdate && receiverInfo.status){
				_address.save(receiverInfo.data,
					function(res){
						_mm.successTip('地址添加成功');
						_this.hide();
						typeof _this.option.onSuccess === 'function' && _this.option.onSuccess(res);
					},
					function(err){
						_mm.errorTip(receiverInfo.err || '地址添加出错了');
					}
				)
			}
			// 更新收件人地址，并且验证通过
			else if(isUpdate && receiverInfo.status){
				receiverInfo.data.id = _this.option.id;
				_address.update(receiverInfo.data,
					function(res){
						_mm.successTip('地址修改成功');
						_this.hide();
						typeof _this.option.onSuccess === 'function' && _this.option.onSuccess(res);
					},
					function(err){
						_mm.errorTip(receiverInfo.err || '修改出错了');
					}
				)
			}
			//验证不通过
			else{
				_mm.errorTip(receiverInfo.err || '验证不通过');
			}
		});

		//保证点击model内容区时不关闭弹窗  阻止事件的冒泡
		$('.model-container').click(function(e){
			e.stopPropagation();
		});

		//关闭弹窗
		$('.close').click(function(){
			_this.hide();
		});

	},

	loadModal : function(){
		var addressModelHtml = _mm.renderHtml(templateAddress,{
			isUpdate : this.option.isUpdate,
			data	 : this.option.data		
		});
		this.$modelWrap.html(addressModelHtml);

		//加载省份 城市
		this.loadProvice();
	},
	// 获取省份信息
	loadProvice : function(){
		var provinces 		= _cities.getProvinces(),
			$provinceSelect = this.$modelWrap.find('#receiver-province');
		$provinceSelect.html(this.getSelectOption(provinces));

		// 如果是更新地址并且有省份信息 做省份的回填
		if(this.option.isUpdate && this.option.data.receiverProvince){
			$provinceSelect.val(this.option.data.receiverProvince);
			this.loadCities(this.option.data.receiverProvince);
		}else{
			this.loadCities();
		}
	},
	//获取联动城市的数据
	loadCities : function(provinceName){
		var cities 		= _cities.getCities(provinceName),
			$citySelect = this.$modelWrap.find('#receiver-city');
		$citySelect.html(this.getSelectOption(cities));

		// 如果是更新地址 并且有城市信息 做省份的回填
		if(this.option.isUpdate && this.option.data.receiverCity){
			$citySelect.val(this.option.data.receiverCity);
		}
	},
	//获取select框的选项 输入：array  输出：html 
	getSelectOption : function(optionArr){
		var html = '<option value="">请选择</option>';
		for( var i=0 ,length = optionArr.length; i < length ; i++ ){
			html += '<option value="'+ optionArr[i] +'">'+ optionArr[i] +'</option>';
		}
		return html;
	},
	// 获取表达收件人信息，并做表单的验证
	getReceiverInfo : function(){
		var receiverInfo = {},
			result		 = {
				status	: false
			};
		receiverInfo.receiverName 	  = $.trim($('#receiver-name').val());
		receiverInfo.receiverProvince = $.trim($('#receiver-province').val());
		receiverInfo.receiverCity 	  = $.trim($('#receiver-city').val());
		receiverInfo.receiverAddress  = $.trim($('#receiver-address').val());
		receiverInfo.receiverPhone    = $.trim($('#receiver-phone').val());
		receiverInfo.receiverCode     = $.trim($('#receiver-code').val());
		if(!receiverInfo.receiverName){
			result.err = '请输入收件人姓名';
		}
		else if(!receiverInfo.receiverProvince){
			result.err = '请输入收件人所在省份';
		}
		else if(!receiverInfo.receiverCity){
			result.err = '请输入收件人所在城市';
		}
		else if(!receiverInfo.receiverAddress){
			result.err = '请输入收件人详细地址';
		}
		else if(!receiverInfo.receiverPhone){
			result.err = '请输入收件人手机号';
		}else if(!_mm.validate(receiverInfo.receiverPhone,'phone')){
			result.err = '手机号码不正确';
		}
		else{
			result.status = true;
			result.data   = receiverInfo;
		}

		return result;
	},
};
module.exports = addressModel; 