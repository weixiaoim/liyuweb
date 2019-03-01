;(function($){
	function init($elem,hiddenCb){
		if($elem.is(":hidden")){
			$elem.data('status','hidden');
			typeof hiddenCb == 'function' && hiddenCb();
		}else{
			$elem.data('status','shown');
		}
	}
	function show($elem,cb){
		if($elem.data('status') == 'shown') return;
		if($elem.data('status') == 'show') return;
		$elem.data('status','show').trigger('show');
		cb();
	}
	function hide($elem,cb){
		if($elem.data('status') == 'hidden') return;
		if($elem.data('status') == 'hide') return;
		$elem.data('status','hide').trigger('hide');
		cb();
	}


	var slient = {
		init:init,
		show:function($elem){
			show($elem,function(){
				$elem.show();
				$elem.trigger('shown').data('status','shown');
			})
		},

		hide:function($elem){
			hide($elem,function(){
				$elem.hide();
				$elem.trigger('hidden').data('status','hidden');			
			})
		}

	}
	var js = {
		fade:{
			init:function($elem){
				js_init($elem);
			},
			show:function($elem){
				js_show($elem,'fadeIn');
			},
			hide:function($elem){
				js_hide($elem,'fadeOut');
			}		
		},
		slideDownUp:{
			init:function($elem){
				js_init($elem);
			},
			show:function($elem){
				js_show($elem,'slideDown');
			},
			hide:function($elem){
				js_hide($elem,'slideUp');
			}			
		},
		slideLeftRight:{
			init:function($elem){
				js_customInit($elem,{
					width:0,
					paddingLeft:0,
					paddingRight:0,
					borderLeftWidth:0,
					borderRightWidth:0				
				});		
			},
			show:function($elem){
				js_customShow($elem)
			},
			hide:function($elem){
				js_customHide($elem,{
					width:0,
					paddingLeft:0,
					paddingRight:0,
					borderLeftWidth:0,
					borderRightWidth:0				
				});
			}
		},
		fadeSlideLeftRight:{
			init:function($elem){
				js_customInit($elem,{
					width:0,
					paddingLeft:0,
					paddingRight:0,
					borderLeftWidth:0,
					borderRightWidth:0,
					opacity:0				
				});		
			},
			show:function($elem){
				js_customShow($elem)
			},
			hide:function($elem){
				js_customHide($elem,{
					width:0,
					paddingLeft:0,
					paddingRight:0,
					borderLeftWidth:0,
					borderRightWidth:0,
					opacity:0				
				});
			}
		},	
	}
	js_init = function($elem){
		$elem.removeClass('transition');
		init($elem);	
	}
	js_show = function($elem,mode){
		show($elem,function(){
			$elem.stop()
			[mode](function(){
				$elem.trigger('shown').data('status','shown');
			});				
		})	
	}
	js_hide = function($elem,mode){
		hide($elem,function(){
			$elem.stop()
			[mode](function(){
				$elem.trigger('hidden').data('status','hidden');
			});				
		})		
	}
	js_customInit = function($elem,options){
		$elem.removeClass('transition');
		//1.保存原始值
		var styles = {};

		for(var key in options){
			styles[key] = $elem.css(key)
		}

		$elem.data('styles',styles);

		//2.如果是原本是隐藏的话,把水平方向上的值改为0	
		init($elem,function(){
			$elem.css(options)
		});		
	}
	js_customShow = function($elem){
		show($elem,function(){
			$elem.show();//display=block
			$elem.stop()
			.animate($elem.data('styles'),function(){
				$elem.trigger('shown').data('status','shown');
			});		
		})	
	}
	js_customHide = function($elem,options){
		hide($elem,function(){
			$elem.stop()
			.animate(options,function(){
				$elem.hide();//display=none
				$elem.trigger('hidden').data('status','hidden');
			});			
		})	
	}


	//注册插件
	$.fn.extend({
		showHide:function(){
			
		}
	})

})(jQuery);