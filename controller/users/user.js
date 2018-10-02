const userModel = require('../../model/users.js')
const authCtrl  = require('./../auth/auth')
module.exports = {
	getUsers: function (req, res) {
		//res.header("Access-Control-Allow-Origin", "*");
		res.status(200).send({ 'message': 'User Details' })
	},
	creaateUser: function (req, res) {
		let userName = req.body.user;
		let password = req.body.password;
		let user = new userModel({ userName: userName, password: password });
		user
			.save()
			.then(function (data) {
				//res.header("Access-Control-Allow-Origin", "*");
				res.status(200).send({ 'message': 'Created User' })
			})
			.catch(function (err) {
				//res.header("Access-Control-Allow-Origin", "*");
				res.status(400).send({ 'err_msg': 'Unable to Create User!' })
			})
	},
	login: function (req, res) {
		let userName = req.body.user;
		let password = req.body.password;
		validateUser(userName,password)
			.then(function (data) {
				if (data.length) {
					return data;
				} else {
					//res.header("Access-Control-Allow-Origin", "*");
					res.status(401).send({ 'message': 'Invalid user!!' })
				}
			})
			.then(function(data){
				authCtrl
					.generateAuthToken(data[0])
					.then((authToken)=>{
						//res.header("Access-Control-Allow-Origin", "*");
						res.status(200).send({
							'username' : data[0].userName,
							'authToken': authToken 
						})	
					})
			})
			.catch(function (err) {
				//res.header("Access-Control-Allow-Origin", "*");
				res.status(500).send({ 'message': 'Something Went Wrong!!' })
			})
	}
}
function validateUser(userName,password) {
	return userModel.find({ userName: userName, password: password })
}