//import mongoose, our ODM for mongoDB
const mongoose = require('mongoose')

//Define all of its fields, like columns of a SQL table
const definition = {
    project_name: {
        type: String,
        required: true
    },

    details: {
        type: String,
        required: true
    },
    
}

//Set any options for the schema
const options = {
    timestamps: true
}

//make the schema as a new instance of a mongoose schema, using our definition and options
const projectSchema = new mongoose.Schema(definition, options)

//export that boye
module.exports = mongoose.model('project', projectSchema)