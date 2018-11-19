//import the NovelStory constant explicitly
const {
    NovelStory
} = require('../database/models')
const trunks = require('trunks-log')
const log = new trunks('NOVELSTORY')

//show all novelstory
exports.index = async (req, res) => {

    //query the DB of all novelstorys
    await NovelStory.find().exec()
        .then(novelstory => {
            log.success('Retrieved all {} novelstorys', novelstory.length)
            res.json({
                novelstory: novelstory
            })
        })
        .catch(err => {
            log.error(err, 'Could not retrieve novelstorys: {}', err.message)
            res.json({
                error: err,
                message: "Could not retrieve novelstorys"
            }).status(500)
        })
}

//Store a new novelstory
exports.store = async (req, res) => {

    let NovelStory = new NovelStory(req.body)

    //save it in the DB
    await novelstorys.save()
        .then(novelstorys => {
            log.success('Created Novel/Story: {}', novelstorys.name)
            //send a 201 and the new resource
            res.status(201).json({
                data: novelstorys
            })
        })
        .catch(err => {
            log.error(err, 'Error creating novelstory: {}', novelstorys.name)
            let errStatus = err.name === 'ValidationError' ? 400 : 500
            res.status(errStatus).json({
                err: err
            })
        })
}

//this function is for looking at one novelstory by their mongo id
exports.show = async (req, res) => {

    //find this sneaky boye
    await NovelStory.findById(req.params.id).exec()
        .then(novelstorys => {
            log.success('Found novelstory: {}', novelstorys.name)
            res.json({
                novelstorys: novelstorys
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

//ever wanted to make the novelstorys disappear
exports.delete = async (req, res) => {

    //find the sneaky boye and make him go away
    await NovelStory.findByIdAndRemove(req.params.id).exec()
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
    await NovelStory
        .findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        .exec()
        .then(novelstorys => {
            log.success('Updated novelstory: {}', req.params.id)
            res.status(200).json({
                novelstorys: novelstorys
            })
        })
        .catch(err => {
            log.error(err, "Could not update novelstory: {}", req.params.id)
            res.status(500).json({
                err: err
            })
        })
}