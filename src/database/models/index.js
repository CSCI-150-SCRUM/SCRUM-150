//bring in the seperate models
const User = require('./user')
const Task = require('./task')
const Project = require('./project')
const Doing = require('./doing')
const Done = require('./done')
const NovelStory = require('./novelstory')
const Todo = require('./todo')
//import other models in the same manner

//export em in a good ol' bundle 
module.exports = {
    User,
    Task,
    Project,
    Doing,
    Done,
    NovelStory,
    Todo
}