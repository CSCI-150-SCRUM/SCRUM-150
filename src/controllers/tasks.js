//import the Tasks constant explicitly
const { Tasks } = require('../database/models')
const trunks = require('trunks-log')
const log = new trunks('TASKS')

//show all users
exports.index = async(req, res) => {

    //query the DB of all users
    await Tasks.find().exec()
        .then(tasks => {
            log.success('Retrieved all {} tasks', tasks.length)
            res.json({ tasks: tasks })
        })
        .catch(err => {
            log.error(err, 'Could not retrieve tasks: {}', err.message)
            res.json({ error: err, message: "Could not retrieve tasks" }).status(500)
        })
}

//Store a new tasks
exports.store = async(req, res) => {

    let tasks = new Tasks(req.body)

    //save it in the DB
    await tasks.save()
        .then(tasks => {
            log.success('Created tasks: {}', tasks.email)
                //send a 201 and the new resource
            res.status(201).json({ data: tasks })
        })
        .catch(err => {
            log.error(err, 'Error creating tasks: {}', tasks.email)
            let errStatus = err.name === 'ValidationError' ? 400 : 500
            res.status(errStatus).json({ err: err })
        })
}

//this function is for looking at one tasks by their mongo id
exports.show = async(req, res) => {

    //find this sneaky boye
    await Tasks.findById(req.params.id).exec()
        .then(tasks => {
            log.success('Found Tasks: {}', user.name)
            res.json({ tasks: tasks })
        })
        .catch(err => {
            log.error(err, 'Error finding tasks: {}', req.params.id)
            res.json({ error: err, message: 'Could not retrieve tasks' }).status(500)
        })
}

//ever wanted to make the users disappear 
exports.delete = async(req, res) => {

    //find the sneaky boye and make him go away
    await Tasks.findByIdAndRemove(req.params.id).exec()
        .then(() => {
            log.success('Deleted tasks: {}', req.params.id)
                //let em know there aint no content no mo
            res.status(204).json()
        })
        .catch(err => {
            log.error(err, 'Error finding tasks: {}', req.params.id)
            res.status(500).json({ err: err })
        })

}

//edit a user based on ID
exports.update = async(req, res) => {
    await Tasks
        .findByIdAndUpdate(req.params.id, req.body, { new: true })
        .exec()
        .then(tasks => {
            log.success('Updated tasks: {}', req.params.id)
            res.status(200).json({ tasks: tasks })
        })
        .catch(err => {
            log.error(err, "Could not update tasks: {}", req.params.id)
            res.status(500).json({ err: err })
        })
}