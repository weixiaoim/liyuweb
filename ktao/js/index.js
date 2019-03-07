;(function($){
	//顶部下拉菜单
	var $menuDropdown = $('.nav-side .dropdown')
	
	$menuDropdown.on('dropdown-show',function(ev){
		var $elem = $(this);
		var loadUrl = $elem.data('load');
		if (!loadUrl) return;
		var isLoaded = $elem.data('isLoaded');
		if (isLoaded) return;
		var $layer = $elem.find('.dropdown-layer');
		$.getJSON(loadUrl,function(data){
			var html = '';
			for(var i = 0;i<data.length;i++){
				html += '<li><a href="'+data[i].url+'" class="menu-item">'+data[i].name+'</a></li>'
			}
			//模拟网路延迟
			setTimeout(function(){
				$layer.html(html);
				$elem.data('isLoaded',true);
			},1000)
		
		})
	});
	$menuDropdown.dropdown({
		delay:200,
	});
	//搜索框
	var $search = $('.header .search');

	$search.on('getData',function(ev,data){
		console.log("get data",data);
		var html = getSearchLayerHtml(data,10)
		$search.search('appendHtml',html)
		if(html == ''){
			$search.search('hideLayer');
		}else{
			$search.search('showLayer');
		}
	});
	$search.on('getNoData',function(){
		$search.search('appendHtml','')
		$search.search('hideLayer');
	});

	function getSearchLayerHtml(data,maxNum){
		var html = '';
		for(var i = 0;i<data.result.length;i++){
			if(i >=maxNum) break;
			html += '<li class="search-item">'+data.result[i][0]+'</li>'
		}
		return html
	}

	$search.search();

	//分类列表
	var $categoryDropdown = $('.category .dropdown')

	$categoryDropdown.dropdown({
		delay:200,
		js:true,
		mode:'slideLeftRight'
	});
})(jQuery);
