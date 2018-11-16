//Here is where we declare the modules and shit we will need
const express = require('express')

//import the controllers and middleware
const {
    doingController
} = require('../controllers/index')
const {
    catchErrors
} = require('../middleware/error-handler')

//set up the router
const router = express.Router()

//get all tasks
router.get('/', catchErrors(doingController.index))

//make a new boy
router.post('/', catchErrors(doingController.store))

//see one boy
router.get('/:id', catchErrors(doingController.show))

//get rid of a boy
router.delete('/:id', catchErrors(doingController.delete))

//update a boy
router.put('/:id', catchErrors(doingController.update))

module.exports = router