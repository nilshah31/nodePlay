const userModel = require('../../model/users.js')
const authCtrl  = require('./../auth/auth')

module.exports = {
	getUser: function (req, res) {
		console.log(req.query.authToken)
		authCtrl
			.getDecodedData(req.query.authToken)
			.then((data)=>{
				res.status(200).send({ 'userName': data.user.userName })
			})
			.catch((err)=>{
				res.status(403).send(
					{ 
						'error_msg'  : 'Please Provide Valid Authtoken!!',
						'error_code' : '403' 
					})
			})
	},
	creaateUser: function (req, res) {
		let userName = req.body.user;
		let password = req.body.password;
		let user = new userModel({ userName: userName, password: password });
		user
			.save()
			.then(function (data) {
				res.status(200).send({ 'message': 'Created User' })
			})
			.catch(function (err) {
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
					throw new Error('Invalid User')
				}
			})
			.then(function(data){
				authCtrl
					.generateAuthToken(data[0])
					.then((authToken)=>{
						res.status(200).send({
							'username' : data[0].userName,
							'authToken': authToken 
						})	
					})
			})
			.catch(function (err) {
				res.status(401).send({ 'message': 'Invalid user!!' })
			})
	}
}
function validateUser(userName,password) {
	return userModel.find({ userName: userName, password: password })
}