//import the Todo constant explicitly
const {
    Todo
} = require('../database/models')
const trunks = require('trunks-log')
const log = new trunks('TODO')

//show all todos
exports.index = async (req, res) => {

    //query the DB of all todos
    await Todo.find().exec()
        .then(todo => {
            log.success('Retrieved all {} todo tasks', todo.length)
            res.json({
                todo: todo
            })
        })
        .catch(err => {
            log.error(err, 'Could not retrieve todo tasks: {}', err.message)
            res.json({
                error: err,
                message: "Could not retrieve todo tasks"
            }).status(500)
        })
}

//Store a new todo
exports.store = async (req, res) => {

    let todo = new Todo(req.body)

    //save it in the DB
    await todo.save()
        .then(todos => {
            log.success('Created Todo: {}', todos.name)
            //send a 201 and the new resource
            res.status(201).json({
                data: todos
            })
        })
        .catch(err => {
            log.error(err, 'Error creating todo: {}', todos.name)
            let errStatus = err.name === 'ValidationError' ? 400 : 500
            res.status(errStatus).json({
                err: err
            })
        })
}

//this function is for looking at one todo by their mongo id
exports.show = async (req, res) => {

    //find this sneaky boye
    await Todo.findById(req.params.id).exec()
        .then(todos => {
            log.success('Found todo: {}', todos.name)
            res.json({
                todo: todos
            })
        })
        .catch(err => {
            log.error(err, 'Error finding todo: {}', req.params.id)
            res.json({
                error: err,
                message: 'Could not retrieve todo'
            }).status(500)
        })
}

//ever wanted to make the todos disappear 
exports.delete = async (req, res) => {

    //find the sneaky boye and make him go away
    await Todo.findByIdAndRemove(req.params.id).exec()
        .then(() => {
            log.success('Deleted Todo: {}', req.params.id)
            //let em know there aint no content no mo
            res.status(204).json()
        })
        .catch(err => {
            log.error(err, 'Error finding todo: {}', req.params.id)
            res.status(500).json({
                err: err
            })
        })

}

//edit a todo based on ID
exports.update = async (req, res) => {
    await Todo
        .findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        .exec()
        .then(todos => {
            log.success('Updated todo: {}', req.params.id)
            res.status(200).json({
                todo: todos
            })
        })
        .catch(err => {
            log.error(err, "Could not update todo: {}", req.params.id)
            res.status(500).json({
                err: err
            })
        })
}