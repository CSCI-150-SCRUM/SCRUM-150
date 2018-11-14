//import the User constant explicitly
const { Task } = require('../database/models')
const trunks = require('trunks-log')
const log = new trunks('TASKS')

//show all tasks
exports.index = async(req, res) => {

    //query the DB of all tasks
    await Task.find().exec()
        .then(tasks => {
            log.success('Retrieved all {} tasks', tasks.length)
            res.json({ users: users })
        })
        .catch(err => {
            log.error(err, 'Could not retrieve tasks: {}', err.message)
            res.json({ error: err, message: "Could not retrieve tasks" }).status(500)
        })
}

//Store a new task
exports.store = async(req, res) => {

    let task = new Task(req.body)

    //save it in the DB
    await task.save()
        .then(task => {
            log.success('Created User: {}', tasks.name)
                //send a 201 and the new resource
            res.status(201).json({ data: task })
        })
        .catch(err => {
            log.error(err, 'Error creating task: {}', tasks.name)
            let errStatus = err.name === 'ValidationError' ? 400 : 500
            res.status(errStatus).json({ err: err })
        })
}

//this function is for looking at one user by their mongo id
exports.show = async(req, res) => {

    //find this sneaky boye
    await Task.findById(req.params.id).exec()
        .then(task => {
            log.success('Found task: {}', tasks.name)
            res.json({ task: task })
        })
        .catch(err => {
            log.error(err, 'Error finding task: {}', req.params.id)
            res.json({ error: err, message: 'Could not retrieve task' }).status(500)
        })
}

//ever wanted to make the users disappear 
exports.delete = async(req, res) => {

    //find the sneaky boye and make him go away
    await Task.findByIdAndRemove(req.params.id).exec()
        .then(() => {
            log.success('Deleted Task: {}', req.params.id)
                //let em know there aint no content no mo
            res.status(204).json()
        })
        .catch(err => {
            log.error(err, 'Error finding task: {}', req.params.id)
            res.status(500).json({ err: err })
        })

}

//edit a user based on ID
exports.update = async(req, res) => {
    await Task
        .findByIdAndUpdate(req.params.id, req.body, { new: true })
        .exec()
        .then(task => {
            log.success('Updated task: {}', req.params.id)
            res.status(200).json({ task: task })
        })
        .catch(err => {
            log.error(err, "Could not update task: {}", req.params.id)
            res.status(500).json({ err: err })
        })
}