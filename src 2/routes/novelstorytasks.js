//Here is where we declare the modules and shit we will need
const express = require('express')

//import the controllers and middleware
const { novelstorytasksController } = require('../controllers/index')
const { catchErrors } = require('../middleware/error-handler')

//set up the router
const router = express.Router()

//get all tasks
router.get('/', catchErrors(novelstorytasksController.index))

//make a new boy
router.post('/', catchErrors(novelstorytasksController.store))

//see one boy
router.get('/:id', catchErrors(novelstorytasksController.show))

//get rid of a boy
router.delete('/:id', catchErrors(novelstorytasksController.delete))

//update a boy
router.put('/:id', catchErrors(novelstorytasksController.update))

module.exports = router