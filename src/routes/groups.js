//Here is where we declare the modules and shit we will need
const express = require('express')

//import the controllers and middleware
const {
    groupsController
} = require('../controllers/index')
const {
    catchErrors
} = require('../middleware/error-handler')

//set up the router
const router = express.Router()

//get all tasks
router.get('/', catchErrors(groupsController.index))

//make a new boy
router.post('/', catchErrors(groupsController.store))

//see one boy
router.get('/:id', catchErrors(groupsController.show))

//get rid of a boy
router.delete('/:id', catchErrors(groupsController.delete))

//update a boy
router.put('/:id', catchErrors(groupsController.update))

module.exports = router