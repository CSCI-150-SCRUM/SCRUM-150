//Here is where we declare the modules and shit we will need
const express = require('express')

//import the controllers and middleware
const { doingtasksController } = require('../controllers/index')
const { catchErrors } = require('../middleware/error-handler')

//set up the router
const router = express.Router()

//get all tasks
router.get('/', catchErrors(doingtasksController.index))

//make a new boy
router.post('/', catchErrors(doingtasksController.store))

//see one boy
router.get('/:id', catchErrors(doingtasksController.show))

//get rid of a boy
router.delete('/:id', catchErrors(doingtasksController.delete))

//update a boy
router.put('/:id', catchErrors(doingtasksController.update))

module.exports = router