//Here is where we declare the modules and shit we will need
const express = require('express')

//import the controllers and middleware
const { projectController } = require('../controllers/index')
const { catchErrors } = require('../middleware/error-handler')

//set up the router
const router = express.Router()

//get all project
router.get('/', catchErrors(projectController.index))

//make a new boy
router.post('/', catchErrors(projectController.store))

//see one boy
router.get('/:id', catchErrors(projectController.show))

//get rid of a boy
router.delete('/:id', catchErrors(projectController.delete))

//update a boy
router.put('/:id', catchErrors(projectController.update))

module.exports = router