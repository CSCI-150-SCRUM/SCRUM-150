/*
 * This file is used to build the API routes, we may have 
 * different routes for views and the like
 */



const express = require('express')

const router = express.Router() //make a new router

const userRoutes = require('./users') //use the user route shit
router.use('/users/', userRoutes) //tell it to use the userRoutes

const tasksRoutes = require('./tasks') //use the tasks route 
router.use('/tasks/', tasksRoutes) //tell it to use the tasksRouter

const projectRoutes = require('./project') //use the project route 
router.use('/project/', projectRoutes) //tell it to use the projectRouter




module.exports = router

