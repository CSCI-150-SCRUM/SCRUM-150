//Here is where we declare the modules and shit we will need
const express = require('express')

//import the controllers and middleware
const { donetasksController } = require('../controllers/index')
const { catchErrors } = require('../middleware/error-handler')

//set up the router
const router = express.Router()

//get all tasks
router.get('/', catchErrors(donetasksController.index))

//make a new boy
router.post('/', catchErrors(donetasksController.store))

//see one boy
router.get('/:id', catchErrors(donetasksController.show))

//get rid of a boy
router.delete('/:id', catchErrors(donetasksController.delete))

//update a boy
router.put('/:id', catchErrors(donetasksController.update))

module.exports = router