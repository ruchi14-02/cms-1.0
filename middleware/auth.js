const { StatusCodes } = require("http-status-codes")
const jwt = require('jsonwebtoken')
/* logged read user id logic */
const auth = async(req,res,next) =>{
    try{
          const token = req.header('Authorization')
          jwt.verify(token, process.env.TOKEN_SECRET,(err,user) =>{
            if(err)
            return res.status(StatusCodes.BAD_REQUEST).json({msg:" token INVALID"})
            // res.json({ id : user})
            req.user = user;
            next()     //forwording response to next token
          })
          // res.json({token})
    
    }catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg  :err.message})
    }
}

module.exports = auth