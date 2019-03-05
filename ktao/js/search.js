;(function ($) {
function Search($elem,options){
	//罗列属性
	this.$elem = $elem;
	this.options = options;
	this.$searchBtn = $elem.find('.search-btn');
	this.$searchInput = $elem.find('.search-input');
	this.$searchFrom = $elem.find('.search-from');
	//初始化
	this.init();
	if(this.options.autocompellete){
		this.autocompellete();
	}
}

Search.prototype = {
	constructor:Search,
	init:function(){
		//绑定事件
		this.$searchBtn.on('click',$.proxy(this.submit,this));
	},
	submit:function(){
		if(this.getInputVal() == '') {
			return false;
		}
		this.$searchFrom.trigger('submit');
	},
	getInputVal:function(){
		return $.trim(this.$searchInput.val());
	},
	autocompellete:function(){
		//监听输入框input事件
		this.$searchInput.on('input',$.proxy(this.getData,this));
	},
	getData:function(){
		console.log('aaa')

		$.ajax({
			url:this.options.url+this.getInputVal(),
			dataType:'jsonp',
			jsonp:'callback'
		})
		.done(function(data){
			console.log(data);
		})
		.fail(function(err){
			console.log(err);
		})
	}
}
Search.DEFAULTS = {
	autocompellete:true,
	url:'https://suggest.taobao.com/sug?&q='
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
			if (typeof search[options] == 'function') {
				search[options]();
			}
		});
	}
})
})(jQuery);