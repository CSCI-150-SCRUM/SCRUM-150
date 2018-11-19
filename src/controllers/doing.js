//import the Doing constant explicitly
const {
    Doing
} = require('../database/models')
const trunks = require('trunks-log')
const log = new trunks('DOING')

//show all doing
exports.index = async (req, res) => {

    //query the DB of all doings
    await Doing.find().exec()
        .then(doing => {
            log.success('Retrieved all {} doing tasks', doing.length)
            res.json({
                doing: doing
            })
        })
        .catch(err => {
            log.error(err, 'Could not retrieve doing tasks: {}', err.message)
            res.json({
                error: err,
                message: "Could not retrieve doing tasks"
            }).status(500)
        })
}

//Store a new doing
exports.store = async (req, res) => {

    let doings = new Doing(req.body)

    //save it in the DB
    await Doing.save()
        .then(doings => {
            log.success('Created Doing: {}', doings.name)
            //send a 201 and the new resource
            res.status(201).json({
                data: doings
            })
        })
        .catch(err => {
            log.error(err, 'Error creating doing: {}', doings.name)
            let errStatus = err.name === 'ValidationError' ? 400 : 500
            res.status(errStatus).json({
                err: err
            })
        })
}

//this function is for looking at one doing by their mongo id
exports.show = async (req, res) => {

    //find this sneaky boye
    await Doing.findById(req.params.id).exec()
        .then(doings => {
            log.success('Found doing: {}', doings.name)
            res.json({
                doings: doings
            })
        })
        .catch(err => {
            log.error(err, 'Error finding doing: {}', req.params.id)
            res.json({
                error: err,
                message: 'Could not retrieve doing'
            }).status(500)
        })
}

//ever wanted to make the doings disappear 
exports.delete = async (req, res) => {

    //find the sneaky boye and make him go away
    await Doing.findByIdAndRemove(req.params.id).exec()
        .then(() => {
            log.success('Deleted User: {}', req.params.id)
            //let em know there aint no content no mo
            res.status(204).json()
        })
        .catch(err => {
            log.error(err, 'Error finding doing: {}', req.params.id)
            res.status(500).json({
                err: err
            })
        })

}

//edit a doing based on ID
exports.update = async (req, res) => {
    await Doing
        .findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        .exec()
        .then(doings => {
            log.success('Updated doing: {}', req.params.id)
            res.status(200).json({
                doings: doings
            })
        })
        .catch(err => {
            log.error(err, "Could not update doing: {}", req.params.id)
            res.status(500).json({
                err: err
            })
        })
}