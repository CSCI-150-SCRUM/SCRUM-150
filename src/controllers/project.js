//import the project constant explicitly
const { project } = require('../database/models')
const trunks = require('trunks-log')
const log = new trunks('PROJECT')

//show all project
exports.index = async(req, res) => {

    //query the DB of all project
    await project.find().exec()
        .then(project => {
            log.success('Retrieved all {} project', project.length)
            res.json({ project: project })
        })
        .catch(err => {
            log.error(err, 'Could not retrieve project: {}', err.message)
            res.json({ error: err, message: "Could not retrieve project" }).status(500)
        })
}

//Store a new project
exports.store = async(req, res) => {

    let project = new project(req.body)

    //save it in the DB
    await project.save()
        .then(project => {
            log.success('Created project: {}', project.details)
                //send a 201 and the new resource
            res.status(201).json({ data: project })
        })
        .catch(err => {
            log.error(err, 'Error creating project: {}', project.details)
            let errStatus = err.name === 'ValidationError' ? 400 : 500
            res.status(errStatus).json({ err: err })
        })
}

//this function is for looking at one project by their mongo id
exports.show = async(req, res) => {

    //find this sneaky boye
    await project.findById(req.params.id).exec()
        .then(project => {
            log.success('Found project: {}', project.project_name)
            res.json({ project: project })
        })
        .catch(err => {
            log.error(err, 'Error finding project: {}', req.params.id)
            res.json({ error: err, message: 'Could not retrieve project' }).status(500)
        })
}

//ever wanted to make the project disappear 
exports.delete = async(req, res) => {

    //find the sneaky boye and make him go away
    await project.findByIdAndRemove(req.params.id).exec()
        .then(() => {
            log.success('Deleted project: {}', req.params.id)
                //let em know there aint no content no mo
            res.status(204).json()
        })
        .catch(err => {
            log.error(err, 'Error finding project: {}', req.params.id)
            res.status(500).json({ err: err })
        })

}

//edit a project based on ID
exports.update = async(req, res) => {
    await project
        .findByIdAndUpdate(req.params.id, req.body, { new: true })
        .exec()
        .then(project => {
            log.success('Updated project: {}', req.params.id)
            res.status(200).json({ project: project })
        })
        .catch(err => {
            log.error(err, "Could not update project: {}", req.params.id)
            res.status(500).json({ err: err })
        })
}