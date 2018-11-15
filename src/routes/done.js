//Here is where we declare the modules and shit we will need
const express = require('express')

//import the controllers and middleware
const {
    doneController
} = require('../controllers/index')
const {
    catchErrors
} = require('../middleware/error-handler')

//set up the router
const router = express.Router()

//get all tasks
router.get('/', catchErrors(doneController.index))

//make a new boy
router.post('/', catchErrors(doneController.store))

//see one boy
router.get('/:id', catchErrors(doneController.show))

//get rid of a boy
router.delete('/:id', catchErrors(doneController.delete))

//update a boy
router.put('/:id', catchErrors(doneController.update))

module.exports = router