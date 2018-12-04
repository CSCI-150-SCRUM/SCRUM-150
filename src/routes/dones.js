//Here is where we declare the modules and shit we will need
const express = require('express')

//import the controllers and middleware
const {
    donesController
} = require('../controllers/index')
const {
    catchErrors
} = require('../middleware/error-handler')

//set up the router
const router = express.Router()

//get all dones
router.get('/', catchErrors(donesController.index))

//make a new boy
router.post('/', catchErrors(donesController.store))

//see one boy
router.get('/:id', catchErrors(donesController.show))

//get rid of a boy
router.delete('/:id', catchErrors(donesController.delete))

//update a boy
router.put('/:id', catchErrors(donesController.update))

module.exports = router