const imageController = require('../controller/imageController')
const route = require('express').Router()
const auth = require('../middleware/auth')

route.post(`/profileImage/upload`,auth, imageController.uploadProfileImage)
route.delete(`/profileImage/delete`,auth, imageController.deleteProfileImage)

module.exports = route 