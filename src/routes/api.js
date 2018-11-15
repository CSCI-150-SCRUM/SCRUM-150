/*
 * This file is used to build the API routes, we may have 
 * different routes for views and the like
 */

const express = require('express')

const router = express.Router() //make a new router

const userRoutes = require('./users') //use the user route shit

const taskRoutes = require('./tasks') //use the tasks route 

const projectRoutes = require('./project') //use the project route 




router.use('/project/', projectRoutes) //tell it to use the projectRouter
router.use('/users/', userRoutes) //tell it to use the userRoutes
router.use('/tasks/', taskRoutes) //tell it to use the tasksRouter




module.exports = router