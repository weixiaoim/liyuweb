(function(window){
	function wQuery(){
		return new wQuery.fn.init();
	}
	wQuery.fn = wQuery.prototype ={
		constructor:wQuery,

		//布尔值false
		init:function(){
			if(!slesctor){
				return this;
			}
		}
		//函数
			else if(typeof slesctor == 'function'){
				window.addEventlistener('DOMContentLoaded',slesctor)
				this[0] = document;
				this.length = 1;
				return this;
			}
	}

	wQuery.fn.init.prototype = wQuery.fn;

	window.wQuery = window.$ = wQuery;
})(window)