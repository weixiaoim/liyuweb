/*
* @Author: TomChen
* @Date:   2019-02-26 18:15:35
* @Last Modified by:   TomChen
* @Last Modified time: 2019-03-05 20:22:55
*/
;(function($){
	function loadHtmlOnce($elem,cb){
		var loadUrl = $elem.data('load');
		if(!loadUrl) return;
		var isLoaded = $elem.data('isLoaded');
		if(isLoaded) return;
		$.getJSON(loadUrl,function(data){
			typeof cb == 'function' && cb($elem,data);
		})		
	}

	//加载图片
	function loadImage(imgUrl,success,error){
		var image = new Image();

		image.onload = function(){
			typeof success == 'function' && success(imgUrl);
		}
		image.onerror = function(){
			typeof error == 'function' && error(imgUrl);
		}
		//模拟网络延时
		setTimeout(function(){
			image.src = imgUrl;	
		},500)	
	}


	//顶部下拉菜单
	var $menuDropdown = $('.nav-side .dropdown');

	$menuDropdown.on('dropdown-show',function(ev){
		loadHtmlOnce($(this),buildMenuLayer);
	});
	function buildMenuLayer($elem,data){
		var html = '';
		for(var i = 0;i<data.length;i++){
			html += '<li><a href="'+data[i].url+'" class="menu-item">'+data[i].name+'</a></li>'
		}
		//模拟网络延时
		setTimeout(function(){
			$elem.find('.dropdown-layer').html(html);
			$elem.data('isLoaded',true);
		},1000);
	}

	$menuDropdown.dropdown({
		delay:200,
	});


	//搜索框
	var $search = $('.header .search');
	$search.on('getData',function(ev,data){
		var html = getSearchLayerHtml(data,5);
		$search.search('appendHtml',html)
		if(html == ''){
			$search.search('hideLayer');
		}else{
			$search.search('showLayer');
		}
	});
	$search.on('getNoData',function(){
		$search.search('appendHtml','');
		$search.search('hideLayer');
	});	

	function getSearchLayerHtml(data,maxNum){
		var html = '';
		for(var i = 0;i<data.result.length;i++){
			if(i >= maxNum) break;
			html += '<li class="search-item">'+data.result[i][0]+'</li>'
		}
		return html;		
	}

	$search.search();

	//分类列表
	var $categoryDropdown = $('.category .dropdown');

	$categoryDropdown.on('dropdown-show',function(ev){
		loadHtmlOnce($(this),buildCategoryLayer)
	});
	function buildCategoryLayer($elem,data){
		var html = '';
		for(var i = 0;i<data.length;i++){
			html += '<dl class="category-details"><dt class="category-details-title fl"><a href="#" class="category-details-title-link">'+data[i].title+'</a></dt><dd class="category-details-item fl">';
			for(var j = 0;j<data[i].items.length;j++){
				html += '<a href="#" class="link">'+data[i].items[j]+'</a>';
			}
			html += '</dd></dl>';
		}
		//模拟网络延时
		setTimeout(function(){
			$elem.find('.dropdown-layer').html(html);
			$elem.data('isLoaded',true);
		},1000);		
	}
	$categoryDropdown.dropdown({
		delay:200,
		js:true,
		mode:"fade"
	});

	//轮播图图片懒加载函数
	function carouselImgLazyLoad($elem){
		var item = {};//{0:'loaded',1:'loaded'}
		var totalItemNum = $elem.find('.carousel-img').length;
		var totalLoadedItemNum = 0;
		var loadFn = null;
		//1.开始加载
		$elem.on('carousel-show',loadFn = function(ev,index,elem){
			console.log('carousel-show trigger....');
			if(item[index] != 'loaded'){
				$elem.trigger('carousel-load',[index,elem])
			}
		});
		//2.执行加载
		$elem.on('carousel-load',function(ev,index,elem){
			console.log('will load img::',index);
			var $imgs = $(elem).find('.carousel-img');
			$imgs.each(function(){
				var $img = $(this);
				var imgUrl = $img.data('src');
				loadImage(imgUrl,function(imgUrl){
					$img.attr('src',imgUrl);
				},function(imgUrl){
					$img.attr('src',"images/focus-carousel/placeholder.png");
				});
				item[index] = 'loaded';
				totalLoadedItemNum++;
				if(totalItemNum == totalLoadedItemNum){
					$elem.trigger('carousel-loaded');
				}
			});

		});
		//3.加载结束
		$elem.on('carousel-loaded',function(){
			$elem.off('carousel-show',loadFn);
		});			
	}
	//焦点区域轮播图	
	var $focusCarousel = $('.focus .carousel-wrap');
	carouselImgLazyLoad($focusCarousel);
	$focusCarousel.carousel({});


	//今日热销域轮播图	
	var $todaysCarousel = $('.todays .carousel-wrap');
	
	carouselImgLazyLoad($todaysCarousel);
	$todaysCarousel.carousel({});


	//楼层图片懒加载函数
	function floorImgLazyLoad($elem){
		var item = {};//{0:'loaded',1:'loaded'}
		var totalItemNum = $elem.find('.floor-img').length;
		var totalLoadedItemNum = 0;
		var loadFn = null;
		//1.开始加载
		$elem.on('tab-show',loadFn = function(ev,index,elem){
			console.log('tab-show trigger....');
			if(item[index] != 'loaded'){
				$elem.trigger('tab-load',[index,elem])
			}
		});
		//2.执行加载
		$elem.on('tab-load',function(ev,index,elem){
			console.log('will load floor img::',index);
			var $imgs = $(elem).find('.floor-img');
			$imgs.each(function(){
				var $img = $(this);
				var imgUrl = $img.data('src');
				loadImage(imgUrl,function(imgUrl){
					$img.attr('src',imgUrl);
				},function(imgUrl){
					$img.attr('src',"images/floor/placeholder.png");
				});
				item[index] = 'loaded';
				totalLoadedItemNum++;
				if(totalItemNum == totalLoadedItemNum){
					$elem.trigger('tab-loaded');
				}
			});

		});
		//3.加载结束
		$elem.on('tab-loaded',function(){
			$elem.off('tab-show',loadFn);
		});			
	}	
	//楼层
	var $floor = $('.floor');

	//判断元素是否进入可视区
	var $win = $(window);
	var $doc = $(document);
	//楼层HTML懒加载函数
	function floorHtmlLazyLoad(){
		var item = {};//{0:'loaded',1:'loaded'}
		var totalItemNum = $floor.find('.floor-img').length;
		var totalLoadedItemNum = 0;
		var loadFn = null;
		//1.开始加载
		$doc.on('floor-show',loadFn = function(ev,index,elem){
			console.log('floor-show trigger....');
			if(item[index] != 'loaded'){
				$doc.trigger('floor-load',[index,elem])
			}
		});
		//2.执行加载
		$doc.on('floor-load',function(ev,index,elem){
			console.log('will load floor html::',index);
			//加载HTML
			//1.生成HTML
			//2.加载HTML
			//3.图片懒加载
			//4.激活选项卡
			item[index] = 'loaded';
			totalLoadedItemNum++;
			if(totalItemNum == totalLoadedItemNum){
				$elem.trigger('floor-loaded');
			}			

		});
		//3.加载结束
		$doc.on('floor-loaded',function(){
			$doc.off('floor-show',loadFn);
		});			
	}

	floorHtmlLazyLoad();	
	
	function isVisible($elem){
		return ($win.height() + $win.scrollTop() > $elem.offset().top) && ($win.scrollTop() < $elem.offset().top+$elem.height());
	}
	function timeToShow(){
		$floor.each(function(index,elem){
			if(isVisible($(elem))){
				$doc.trigger('floor-show',[index,elem]);
			}
		});		
	}
	$win.on('scroll resize load',function(){
		clearTimeout($floor.showFloorTimer);
		$floor.showFloorTimer = setTimeout(timeToShow,200);
	});

	$floor.tab({});
})(jQuery);






