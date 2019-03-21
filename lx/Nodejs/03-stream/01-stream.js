const {Readable} = require('stream');
// console.log(Readable);

class MyReader extends Readable{
	constructor(){
		super();
		this.index = 0;
	}

	_read(){
		this.index++;
		if (this.index>5) {
			this.push(null);
		}else{
			this.push(this.index);
		}
	}
}
