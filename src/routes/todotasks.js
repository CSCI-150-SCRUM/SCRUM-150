//Here is where we declare the modules and shit we will need
const express = require('express')

//import the controllers and middleware
const { todotasksController } = require('../controllers/index')
const { catchErrors } = require('../middleware/error-handler')

//set up the router
const router = express.Router()

//get all tasks
router.get('/', catchErrors(todotasksController.index))

//make a new boy
router.post('/', catchErrors(todotasksController.store))

//see one boy
router.get('/:id', catchErrors(todotasksController.show))

//get rid of a boy
router.delete('/:id', catchErrors(todotasksController.delete))

//update a boy
router.put('/:id', catchErrors(todotasksController.update))

module.exports = router