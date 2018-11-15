/*
 * This file is used to build the API routes, we may have 
 * different routes for views and the like
 */



const express = require('express')

const loginRoutes = require('./login')

const router = express.Router() //make a new router

const userRoutes = require('./users') //use the user route shit
router.use('/users/', userRoutes) //tell it to use the userRoutes

const tasksRoutes = require('./tasks') //use the tasks route 
router.use('/tasks/', tasksRoutes) //tell it to use the tasksRouter

const projectRoutes = require('./project') //use the project route 
router.use('/project/', projectRoutes) //tell it to use the projectRouter

<<<<<<< HEAD
router.use('/login/', loginRoutes)

module.exports = router
=======
>>>>>>> 2f58d62308108ab88360f019c12e0353f1ece887



module.exports = router