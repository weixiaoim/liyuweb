;(function($){

var cache = {
	data:{},
	count:0,
	addData:function(key,val){
		this.data[key] = val;
		this.count++;
	},
	getData:function(key){
		return this.data[key];
	}
}





function Search($elem,options){
	//1.罗列属性
	this.$elem = $elem;
	this.options = options;
	this.$searchBtn = $elem.find('.search-btn');
	this.$searchInput = $elem.find('.search-input');
	this.$searchForm = $elem.find('.search-form');
	this.$searchLayer = $elem.find('.search-layer');
	this.timer = 0;
	this.$isLoaded = false;
	this.jqXHR = null;
	//2.初始化
	this.init();
	if(this.options.autocomplete){
		this.autocomplete();
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
	autocomplete:function(){
		//1.初始化显示隐藏
		this.$searchLayer.showHide(this.options)
		//2.监听输入框input事件
		this.$searchInput.on('input',function(){
			//防止快速输入多次请求
			if (this.options.getDataDelay) {
				clearTimeout(this.timer);
				this.timer = setTimeout(function(){
					this.getData();
				}.bind(this),this.options.getDataDelay)
			}else{
				this.getData();
			}
		}.bind(this));
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
		console.log('will get data...');
		// console.log(this.options.url)
		var inputVal = this.getInputVal();
		if(inputVal == ''){
			this.appendHtml('');
			this.hideLayer();
			return;
		}
		// console.log('cache',cache);
		if (cache.getData(inputVal)) {
			this.$elem.trigger('getData',[cache.getData(inputVal)])
			return;
		}
		console.log('will trigger ajax...');

		if(this.jqXHR){
			this.jqXHR.abort();
		}
		this.jqXHR = $.ajax({
			url:this.options.url + this.getInputVal(),
			dataType:"jsonp",
			jsonp:"callback",
		})
		.done(function(data){
			this.$elem.trigger('getData',[data])
			cache.addData(inputVal,data);
		}.bind(this))
		.fail(function(err){
			this.$elem.trigger('getNoData')
			// this.appendHtml('');
			// this.hideLayer();
		}.bind(this))
		.always(function(){
			this.jqXHR = null;
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
	autocomplete:true,
	url:"https://suggest.taobao.com/sug?code=utf-8&q=",
	// url:"http://127.0.0.1:3001/?&q=",
	mode:'slideDownUp',
	getDataDelay:200

}

$.fn.extend({
	search:function(options,val){
		return this.each(function(){
			var $elem = $(this);
			var search = $elem.data('search');
			if(!search){
				options = $.extend({},Search.DEFAULTS,options);
				search = new Search($elem,options);
				$elem.data('search',search);				
			}
			if(typeof search[options] == 'function'){
				search[options](val);
			}

		});
	}
})
	
})(jQuery);