const userModel = require('../../model/users.js')
module.exports = {
	getUsers: function (req, res) {
		//res.header("Access-Control-Allow-Origin", "*");
		res.status(200).send({'message':'User Details'})
	},
	creaateUser: function (req, res) {
		let userName = req.body.user;
		let password = req.body.password;
		let user = new userModel({ userName: userName, password: password });
		user
			.save()
			.then(function(data){
				res.header("Access-Control-Allow-Origin", "*");
				res.status(200).send({'message':'Created User'})
			})
			.catch(function(err){
				res.header("Access-Control-Allow-Origin", "*");
				res.status(400).send({'err_msg':'Unable to Create User!'})
			})
	},
	validateUser: function (req, res) {
		let userName = req.body.user;
		let password = req.body.password;
		userModel
			.find({userName:userName,password:password})
			.then(function(data){
				if(data.length){
					res.header("Access-Control-Allow-Origin", "*");
					res.status(200).send({
						'username': data[0].userName
					})		
				}else{
					res.header("Access-Control-Allow-Origin", "*");
					res.status(401).send({'message':'Invalid user!!'})
				}
			})
			.catch(function(err){
				res.header("Access-Control-Allow-Origin", "*");
				res.status(500).send({'message':'Something Went Wrong!!'})
			})
	}
}	