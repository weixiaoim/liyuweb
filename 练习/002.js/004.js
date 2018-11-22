var oBox =document.getElementById('box')
function toChange(){
var oBox =document.getElementById('box');
	oBox.style.width = '200px';
	oBox.style.height = '200px';
	oBox.style.backgroundColor = 'red';
}
oBox.onclick=toChange;