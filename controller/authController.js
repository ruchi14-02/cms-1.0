
const {StatusCodes} = require('http-status-codes')


const authController = {
    register :async(req,res)=>{
        try{
res.json({msg : "registered"})
        }catch{
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg :err.message})
        }
    },
    login :async(req,res)=>{
        try{
            res.json({msg : "login"})
        }catch{
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg :err.message})
        }
    },
    logout :async(req,res)=>{
        try{
            res.json({msg : "logout"})
        }catch{
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR0).json({msg :err.message})
        }
    },
    refreshToken :async(req,res)=>{
        try{
            res.json({msg : "refresh token"})
        }catch{
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg :err.message})
        }
    },
    resetPassword :async(req,res)=>{
        try{
            res.json({msg : "reset password"})
        }catch{
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg :err.message})
        }
    }
}
module.exports = authController