//import the User constant explicitly
const {
    Done
} = require('../database/models')
const trunks = require('trunks-log')
const log = new trunks('DONES')

//show all dones
exports.index = async (req, res) => {

    //query the DB of all dones
    await Done.find().exec()
        .then(dones => {
            log.success('Retrieved all {} dones', dones.length)
            res.json({
                dones: dones
            })
        })
        .catch(err => {
            log.error(err, 'Could not retrieve dones: {}', err.message)
            res.json({
                error: err,
                message: "Could not retrieve dones"
            }).status(500)
        })
}

//Store a new done
exports.store = async (req, res) => {

    let done = new Done(req.body)

    //save it in the DB
    await done.save()
        .then(done => {
            log.success('Created Done: {}', done.name)
            //send a 201 and the new resource
            res.status(201).json({
                data: done
            })
        })
        .catch(err => {
            log.error(err, 'Error creating done: {}', done.name)
            let errStatus = err.name === 'ValidationError' ? 400 : 500
            res.status(errStatus).json({
                err: err
            })
        })
}

//this function is for looking at one user by their mongo id
exports.show = async (req, res) => {

    //find this sneaky boye
    await Done.findById(req.params.id).exec()
        .then(done => {
            log.success('Found done: {}', done.name)
            res.json({
                done: done
            })
        })
        .catch(err => {
            log.error(err, 'Error finding done: {}', req.params.id)
            res.json({
                error: err,
                message: 'Could not retrieve done'
            }).status(500)
        })
}

//ever wanted to make the users disappear 
exports.delete = async (req, res) => {

    //find the sneaky boye and make him go away
    await Done.findByIdAndRemove(req.params.id).exec()
        .then(() => {
            log.success('Deleted Done: {}', req.params.id)
            //let em know there aint no content no mo
            res.status(204).json()
        })
        .catch(err => {
            log.error(err, 'Error finding done: {}', req.params.id)
            res.status(500).json({
                err: err
            })
        })

}

//edit a user based on ID
exports.update = async (req, res) => {
    await Done
        .findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        .exec()
        .then(done => {
            log.success('Updated done: {}', req.params.id)
            res.status(200).json({
                done: done
            })
        })
        .catch(err => {
            log.error(err, "Could not update done: {}", req.params.id)
            res.status(500).json({
                err: err
            })
        })
}