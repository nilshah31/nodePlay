module.exports = {
  verifyUser : function(req,res,next){
    const authToken = req.get('authToken');
    if(authToken){
      console.log("AuthToken Is : ",authToken)
      next()
    }else{
      res.status(403).send({
        error_code :"403",
        message    :"Valid authToken is required"
      })
    }  
  }
}