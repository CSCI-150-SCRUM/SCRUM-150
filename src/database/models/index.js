//bring in the seperate models
//const User = require('./user')
const Task = require('./task')
const Project = require('./project')
const Doing = require('./doing')
const Done = require('./done')
const Novelstory = require('./novelstory')
const Todo = require('./todo')
const Group = require('./group')
//import other models in the same manner

//export em in a good ol' bundle 
module.exports = {
    //    User,
    Task,
    Project,
    Doing,
    Done,
    Novelstory,
    Todo,
    Group
}