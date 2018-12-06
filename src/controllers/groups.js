//import the Group constant explicitly
const {
    Group
} = require('../database/models')
const trunks = require('trunks-log')
const log = new trunks('GROUPS')

//show all groups
exports.index = async (req, res) => {

    //query the DB of all groups
    await Group.find().exec()
        .then(groups => {
            log.success('Retrieved all {} groups', groups.length)
            res.json({
                groups: groups
            })
        })
        .catch(err => {
            log.error(err, 'Could not retrieve groups: {}', err.message)
            res.json({
                error: err,
                message: "Could not retrieve groups"
            }).status(500)
        })
}

//Store a new group
exports.store = async (req, res) => {

    let group = new Group(req.body)

    //save it in the DB
    await group.save()
        .then(group => {
            log.success('Created Group: {}', group.name)
            //send a 201 and the new resource
            res.status(201).json({
                data: group
            })
        })
        .catch(err => {
            log.error(err, 'Error creating group: {}', group.name)
            let errStatus = err.name === 'ValidationError' ? 400 : 500
            res.status(errStatus).json({
                err: err
            })
        })
}

//this function is for looking at one user by their mongo id
exports.show = async (req, res) => {

    //find this sneaky boye
    await Group.findById(req.params.id).exec()
        .then(group => {
            log.success('Found group: {}', group.name)
            res.json({
                group: group
            })
        })
        .catch(err => {
            log.error(err, 'Error finding group: {}', req.params.id)
            res.json({
                error: err,
                message: 'Could not retrieve group'
            }).status(500)
        })
}

//ever wanted to make the groups disappear
exports.delete = async (req, res) => {

    //find the sneaky boye and make him go away
    await Group.findByIdAndRemove(req.params.id).exec()
        .then(() => {
            log.success('Deleted Group: {}', req.params.id)
            //let em know there aint no content no mo
            res.status(204).json()
        })
        .catch(err => {
            log.error(err, 'Error finding group: {}', req.params.id)
            res.status(500).json({
                err: err
            })
        })

}

//edit a group based on ID
exports.update = async (req, res) => {
    await Group
        .findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        .exec()
        .then(group => {
            log.success('Updated group: {}', req.params.id)
            res.status(200).json({
                group: group
            })
        })
        .catch(err => {
            log.error(err, "Could not update group: {}", req.params.id)
            res.status(500).json({
                err: err
            })
        })
}