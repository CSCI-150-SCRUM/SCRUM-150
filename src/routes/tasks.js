//Here is where we declare the modules and shit we will need
const express = require('express')

//import the controllers and middleware
const {
    tasksController
} = require('../controllers/index')
const {
    catchErrors
} = require('../middleware/error-handler')

//set up the router
const router = express.Router()

//get all tasks
router.get('/', catchErrors(tasksController.index))

//make a new boy
router.post('/', catchErrors(tasksController.store))

//see one boy
router.get('/:id', catchErrors(tasksController.show))

//get rid of a boy
router.delete('/:id', catchErrors(tasksController.delete))

//update a boy
router.put('/:id', catchErrors(tasksController.update))

module.exports = router