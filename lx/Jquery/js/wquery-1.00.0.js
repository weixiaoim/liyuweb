(function(window){

	function wQuery(selector){
		return new wQuery.fn.init(selector);
	}
	wQuery.fn = wQuery.prototype ={
		constructor:wQuery,

		init:function(selector){
			// console.log(selector)
			//1.布尔值false
			if(!selector){
				return this;
			}
			//2.函数
			else if(wQuery.isFunction(selector)){
                // console.log('function');
                window.addEventListener('DOMContentLoaded',selector)
                this[0] = document;
                this.length = 1;
                // return this;
   	    	}
			//3. 字符串
			else if (wQuery.isString(selector)) {
				//3.1 html代码
				//console.log(wQuery.isHtml(selector))
				if (wQuery.isHtml(selector)) {
					// console.log('html')
					var tempDom = document.createElement('div');
					tempDom.innerHTML = selector;
					for (var i = 0; i < tempDom.children.length; i++) {
						this[i] = tempDom.children[i];
					}
					this.length = tempDom.children.length;
					// return this;
				}
				// 3.2 选择器
				else{
					// console.log('st')
					var doms = document.querySelectorAll(selector);
					for (var i = 0; i < doms.length; i++) {
						this[i] = doms[i];
					}
					this.length = doms.length;
				}
			}
			//4.数组
			// console.log(wQuery.isArray(selector));
			else if(wQuery.isArray(selector)){
				for (var i = 0; i < selector.length; i++) {
					this[i] = selector[i]
				}
				this.length = selector.length;
			}
			//5.对象(其他)
			else{
				this[0] =selector;
				this.length = 1;
			}
		},
		get:function(num){
			if(num){
				if(wQuery.isNumber(num)){
					if(num >= 0){
						return this[num];
					}else{
						return this[this.length + num];
					}
				}
			}else{
				var arr = [];
				for (var i = 0; i < this.length; i++) {
					arr.push(this[i])
				}
				return arr;
			}
		}
	}

	wQuery.isFunction = function(str){
	    return typeof str == 'function';
	}

	wQuery.isString = function(str){
		return typeof str == 'string';
	}

	wQuery.isHtml = function(str){
		return /<[^<>]+>/.test(str);
	}
	wQuery.isArray = function(str){
		return typeof str == 'object' && length in str;
	}
	wQuery.isNumber = function(str){
		return typeof str =='number';
	}

	wQuery.fn.init.prototype = wQuery.fn;

	window.wQuery = window.$ = wQuery;
})(window)