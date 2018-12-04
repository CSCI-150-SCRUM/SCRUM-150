//Here is where we declare the modules and shit we will need
const express = require('express')

//import the controllers and middleware
const {
    novelstoryController
} = require('../controllers/index')
const {
    catchErrors
} = require('../middleware/error-handler')

//set up the router
const router = express.Router()

//get all tasks
router.get('/', catchErrors(novelstoryController.index))

//make a new boy
router.post('/', catchErrors(novelstoryController.store))

//see one boy
router.get('/:id', catchErrors(novelstoryController.show))

//get rid of a boy
router.delete('/:id', catchErrors(novelstoryController.delete))

//update a boy
router.put('/:id', catchErrors(novelstoryController.update))

module.exports = router