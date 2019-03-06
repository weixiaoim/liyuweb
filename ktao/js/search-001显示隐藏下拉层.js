;(function($){

function Search($elem,options){
	//1.罗列属性
	this.$elem = $elem;
	this.options = options;
	this.$searchBtn = $elem.find('.search-btn');
	this.$searchInput = $elem.find('.search-input');
	this.$searchForm = $elem.find('.search-form');
	this.$searchLayer = $elem.find('.search-layer');

	this.$isLoaded = false;
	//2.初始化
	this.init();
	if(this.options.autocompelete){
		this.autocompelete();
	}
}
Search.prototype = {
	constructor:Search,
	init:function(){
		//绑定事件
		this.$searchBtn.on('click',$.proxy(this.submit,this))
	},
	submit:function(){
		if(this.getInputVal() == ''){
			return false;
		}
		this.$searchForm.trigger('submit')
	},
	getInputVal:function(){
		return $.trim(this.$searchInput.val())
	},
	autocompelete:function(){
		//1.初始化显示隐藏
		this.$searchLayer.showHide(this.options)
		//2.监听输入框input事件
		this.$searchInput.on('input',$.proxy(this.getData,this));
		//3.点击页面其他地方隐藏下拉框
		$(document).on('click',$.proxy(this.hideLayer,this));
		//4.获取焦点的时候显示下拉框
		this.$searchInput.on('focus',$.proxy(this.showLayer,this));
		//5.阻止input上点击事件冒泡到document上
		this.$searchInput.on('click',function(ev){
			ev.stopPropagation();
		})
	},
	getData:function(){
		console.log('laia kuaihuoa ');
		// console.log(this.options.url)
		var inputVal = this.getInputVal();
		if(inputVal == ''){
			this.appendHtml('');
			this.hideLayer();
			return;
		}

		$.ajax({
			url:this.options.url + this.getInputVal(),
			dataType:"jsonp",
			jsonp:"callback",
		})
		.done(function(data){
			// console.log(data);
			//1.根据数据生成html
			var html = '';
			for(var i = 0;i<data.result.length;i++){
				html += '<li class="search-item">'+data.result[i][0]+'</li>'
			}
			if(html == ''){
				this.appendHtml(html);
			}
			//2.加载html到下拉层
			this.appendHtml(html);
			if(html == ''){
				this.hideLayer();
			}else{
				this.showLayer();
			}
		}.bind(this))
		.fail(function(err){
			this.appendHtml('');
			this.hideLayer();
		}.bind(this))

	},
	showLayer:function(){
		if(!this.$isLoaded) return;
		this.$searchLayer.showHide('show');
	},
	appendHtml:function(html){
		this.$searchLayer.html(html);
		this.$isLoaded = !!html;
	},
	hideLayer:function(){
		this.$searchLayer.showHide('hide');
	},

}
Search.DEFAULTS = {
	autocompelete:true,
	url:"https://suggest.taobao.com/sug?code=utf-8&q=",
	// url:"http://127.0.0.1:3001/?&q=",
	mode:'slideDownUp'

}

$.fn.extend({
	search:function(options){
		return this.each(function(){
			var $elem = $(this);
			var search = $elem.data('search');
			if(!search){
				options = $.extend({},Search.DEFAULTS,options);
				search = new Search($elem,options);
				$elem.data('search',search);				
			}
			if(typeof search[options] == 'function'){
				search[options]();
			}

		});
	}
})
	
})(jQuery);