/*
* @Author: TomChen
* @Date:   2018-11-22 18:22:03
* @Last Modified by:   TomChen
* @Last Modified time: 2018-11-22 18:58:57
*/

function toChange(){
	//alert('hi')
	var oBox = document.getElementById('box');
	oBox.style.width = '200px';
	oBox.style.height = '200px';
	oBox.style.backgroundColor = 'red';
}

var oBox = document.getElementById('box');
// oBox.onclick = "toChange()";
oBox.onclick = toChange;

