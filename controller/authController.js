
const {StatusCodes} = require('http-status-codes')
const User = require("../model/userModel")
const bcrypt = require('bcryptjs') //default importes
const {createAccessToken}  = require("../util/token") //named importes / user define import
const jwt = require('jsonwebtoken')
const authController = {
    
    register :async(req,res)=>{
    
        try{
            const{name,email,mobile,password} = req.body

            const encPassword = await bcrypt.hash(password, 10)//encryption of paassswwoord

const newUser = await User.create({
    name,
    email,
    mobile,
    password :encPassword
})
          res.status(StatusCodes.OK).json({msg:"user registered successfully" , data:newUser})
        }catch(err){
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg :err.message})
        }
    },
    login :async(req,res)=>{
        try{
            const { email, password} = req.body

            //user email exists or not
            const extUser = await User.findOne({email})
            if(!extUser)
            return res.status(StatusCodes.NOT_FOUND).json({msg :"use don't exists"})
            //validate and compare the pass
            const isMatch = await bcrypt.compare(password , extUser.password)
            if(!isMatch)
            return res.status(StatusCodes.BAD_REQUEST).json({msg :"password are not matched"})
             //login successfully - generate tokens
             const accessToken = createAccessToken({ _id: extUser._id})
     
             //save token in cookies
             res.cookie('refreshToken',accessToken,{
                     httpOnly:true,
                     signed:true,
                     path:`/api/v1/auth/refreshToken`,
                     maxAge:1*24*60*60*1000
             })

            res.json({msg:"logged in successfully",accessToken})
        }catch(err){
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg :err.message})
        }
    },
    logout :async(req,res)=>{
        try{
            res.clearCookie('refreshToken', {path:`/api/v1/auth/refreshToken`}) //clear the cookies and logout with session
            res.json({msg : "logout successfully"})
        }catch(err){
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR0).json({msg :err.message})
        }
    },
    refreshToken :async(req,res)=>{
        try{
            const rf = req.signedCookies.refreshToken // retrive cookie when logged inn

            if(!rf)
        
            return res.status(StatusCodes.BAD_REQUEST).json({msg :"sessionn expired login again plz"})
            jwt.verify(rf,process.env.TOKEN_SECRET,(err,user) =>{
                if(err)
                return res.status(StatusCodes.BAD_REQUEST).json({msg :"invalid access token /login Again"})

                //valid token
            const accessToken = createAccessToken({_id : user._id})
             res.json({accessToken})
            })

            // res.json({rf})
        }catch(err){
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg :err.message})
        }
    },
    resetPassword :async(req,res)=>{
        try{
            // res.json({user:req.user})
           const id = req.user.id

           const{oldPassword, newPassword} = req.body
        //    //read user data
           const extUser = await User.findById({_id :id})
           if(!extUser)
            return res.status(StatusCodes.NOT_FOUND).json({msg :"user don't exists"})

        //     //compare password
            const isMatch = await bcrypt.compare(oldPassword , extUser.password)
            if(!isMatch)
            return res.status(StatusCodes.BAD_REQUEST).json({msg :" old password are not matched"})

            
           const {password} = req.body
        // //   generate new password
           const passwordHash = await bcrypt.hash(newPassword, 10)
        //    //update logic
  
        const output=  await User.findByIdAndUpdate({_id:id},{password:passwordHash })

        //  //output response
           res.json({msg:"user pass reset", output} )
      
           
        }catch(err){
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg :err.message})
        }
    }
}
module.exports = authController