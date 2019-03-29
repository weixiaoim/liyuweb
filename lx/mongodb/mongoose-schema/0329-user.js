const mongoose = require('mongoose');
const UserModel = require('./models/user.js')
mongoose.connect('mongodb://localhost/yangkai', {useNewUrlParser: true});

const db = mongoose.connection;

db.on('error', (err)=>{
	console.log('connection error');
	throw err;
});

db.once('open', ()=>{
	console.log('connection successful');
	
	UserModel.insertMany({
		// name:"wyk",
		age:18,
		major:"art"
	},(err,docs)=>{
		if(err){
			console.log('insertMany err::',err)
		}else{
			console.log(docs)
		}
	})
});