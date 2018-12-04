//import the Novelstory constant explicitly
const {
    Novelstory
} = require('../database/models')
const trunks = require('trunks-log')
const log = new trunks('NOVELSTORY')

//show all novelstory
exports.index = async (req, res) => {

    //query the DB of all novelstory
    await Novelstory.find().exec()
        .then(novelstory => {
            log.success('Retrieved all {} novelstory', novelstory.length)
            res.json({
                novelstory: novelstory
            })
        })
        .catch(err => {
            log.error(err, 'Could not retrieve novelstory: {}', err.message)
            res.json({
                error: err,
                message: "Could not retrieve novelstory"
            }).status(500)
        })
}

//Store a new novelstory
exports.store = async (req, res) => {

    let novelstory = new Novelstory(req.body)

    //save it in the DB
    await novelstory.save()
        .then(novelstory => {
            log.success('Created Novel/Story: {}', novelstory.name)
            //send a 201 and the new resource
            res.status(201).json({
                data: novelstory
            })
        })
        .catch(err => {
            log.error(err, 'Error creating novelstory: {}', novelstory.name)
            let errStatus = err.name === 'ValidationError' ? 400 : 500
            res.status(errStatus).json({
                err: err
            })
        })
}

//this function is for looking at one novelstory by their mongo id
exports.show = async (req, res) => {

    //find this sneaky boye
    await Novelstory.findById(req.params.id).exec()
        .then(novelstory => {
            log.success('Found novelstory: {}', novelstory.name)
            res.json({
                novelstory: novelstory
            })
        })
        .catch(err => {
            log.error(err, 'Error finding novelstory: {}', req.params.id)
            res.json({
                error: err,
                message: 'Could not retrieve novelstory'
            }).status(500)
        })
}

//ever wanted to make the novelstory disappear
exports.delete = async (req, res) => {

    //find the sneaky boye and make him go away
    await Novelstory.findByIdAndRemove(req.params.id).exec()
        .then(() => {
            log.success('Deleted Novel/Story: {}', req.params.id)
            //let em know there aint no content no mo
            res.status(204).json()
        })
        .catch(err => {
            log.error(err, 'Error finding novelstory: {}', req.params.id)
            res.status(500).json({
                err: err
            })
        })

}

//edit a novelstory based on ID
exports.update = async (req, res) => {
    await Novelstory
        .findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        .exec()
        .then(novelstory => {
            log.success('Updated novelstory: {}', req.params.id)
            res.status(200).json({
                novelstory: novelstory
            })
        })
        .catch(err => {
            log.error(err, "Could not update novelstory: {}", req.params.id)
            res.status(500).json({
                err: err
            })
        })
}