//Here is where we declare the modules and shit we will need
const express = require('express')

//import the controllers and middleware
const {
    todoController
} = require('../controllers/index')
const {
    catchErrors
} = require('../middleware/error-handler')

//set up the router
const router = express.Router()

//get all tasks
router.get('/', catchErrors(todoController.index))

//make a new boy
router.post('/', catchErrors(todoController.store))

//see one boy
router.get('/:id', catchErrors(todoController.show))

//get rid of a boy
router.delete('/:id', catchErrors(todoController.delete))

//update a boy
router.put('/:id', catchErrors(todoController.update))

module.exports = router