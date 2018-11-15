//import mongoose, our ODM for mongoDB
const mongoose = require('mongoose')

//Define all of its fields, like columns of a SQL table
const definition = {
    name: {
        type: String,
        required: true
    },
    date_created: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    assigned_to: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        required: true
    }
}

//Set any options for the schema
const options = {
    timestamps: true
}

//make the schema as a new instance of a mongoose schema, using our definition and options
const novelstorySchema = new mongoose.Schema(definition, options)

//export that boye
module.exports = mongoose.model('NovelStory', novelstorySchema)