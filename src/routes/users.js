//Here is where we declare the modules and shit we will need
const express = require('express')

//import the controllers and middleware
const { usersController } = require('../controllers/index')
const { catchErrors } = require('../middleware/error-handler')

//set up the router
const router = express.Router()

//get all users
router.get('/users', catchErrors(usersController.index))

//make a new boy
router.post('/users', catchErrors(usersController.store))

//see one boy
router.get('/users:id', catchErrors(usersController.show))

//get rid of a boy
router.delete('/users:id', catchErrors(usersController.delete))

//update a boy
router.put('/users:id', catchErrors(usersController.update))

module.exports = router