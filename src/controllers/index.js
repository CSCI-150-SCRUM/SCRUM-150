//Here we will import all our controllers, this way we only need to
//import the controller as a single module, or an explicit constant later!!!
const usersController = require('./users')
const tasksController = require('./tasks')
const projectController = require('./project')
const doingController = require('./doing')
const doneController = require('./done')
const novelstoryController = require('./novelstory')
const todoController = require('./todo')


module.exports = {
    tasksController,
    usersController,
    projectController,
    doingController,
    doneController,
    novelstoryController,
    todoController
}