const {StatusCodes} = require('http-status-codes')
const { findById } = require('../model/userModel')
const User = require("../model/userModel")


const userController = {
    
    getAll:async(req,res) =>{
        try{
            const users = await User.find({}).select('-password')

            const filteredUsers = users.filter((item) => item.role !== "superadmin")

            res.json({users : filteredUsers , length:filteredUsers.length})
                //find the total useres we have exists
            //  res.json({users , length:users.length})
                    }catch(err){
                        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg :err.message})
                    }
    },
    getCurrentUser:async(req,res) =>{
        
        try{

            const id = req.user._id
            const user = await User.findById({_id : id})
            res.json({user })
                    }catch(err){
                        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg :err.message})
                    }
    },
    updateUser:async(req,res) => {
        try{
            const {name,mobile,image,email} = req.body

            await User.findByIdAndUpdate({_id : req.user._id} , {name,mobile,image,email})

        res.status(StatusCodes.OK).json({msg:"user data updated successfully"})

                    }catch(err){
                        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg :err.message})
                    }
    },
    deleteUser  :async(req,res) =>{
        try{
            const id = req.params._id
            await User.findByIdAndDelete({_id :id})

            res.json({msg : "deleted user info successfully"})
                    }catch(err){
                        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg :err.message})
                    }
    },
    changeRole:async(req,res) =>{

        try{
            const id = req.params._id
            const {role} = req.body
            await User.findByIdAndUpdate({_id :id},{role})

            res.json({msg : "Role Updated Successfully"})
                    }catch(err){
                        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg :err.message})
                    }
    }

}
module.exports  =  userController