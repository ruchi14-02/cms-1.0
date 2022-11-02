const {Statuscodes} = require('http-status-codes')


const adminAuth = async(req,res,next) =>{
    try{

    }catch(err){
        return res.status(Statuscodes.INTERNAL_SERVER_ERROR .json({msg :err.message}))
    }

}

module.exports = adminAuth