//bring in the seperate models
const User = require('./user')
const Task = require('./tasks')
const Project = require('./project')
    //import other models in the same manner

//export em in a good ol' bundle 
module.exports = {
    User,
    Task,
    Project
}