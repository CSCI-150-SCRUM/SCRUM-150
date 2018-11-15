
//Here we will import all our controllers, this way we only need to
//import the controller as a single module, or an explicit constant later!!!
const usersController = require('./users')
const tasksController = require('./tasks')
const projectController = require ('./project')
const loginController = require ('./login')

module.exports = {
    tasksController,
<<<<<<< HEAD
    projectController,
    loginController
=======
    usersController,
    projectController
>>>>>>> 2f58d62308108ab88360f019c12e0353f1ece887
}