const route =require('express').Router()

const userController = require('../controller/userController')
const auth = require('../middleware/auth')
const adminAuth = require('../middleware/adminAuth')
const userAuth = require('../middleware/userAuth')

//this three restricted to admin authorization
route.get(`/allUsers` ,auth,adminAuth ,userController.getAll)
route.delete(`/delete/:_id` ,auth,adminAuth, userController.deleteUser)
route.patch(`/changeRole/:_id` ,auth,adminAuth, userController.changeRole)


//this two for user auth
route.get(`/currentUser` ,auth, userController.getCurrentUser)
route.patch(`/update` ,auth,userAuth,  userController.updateUser)



module.exports = route
