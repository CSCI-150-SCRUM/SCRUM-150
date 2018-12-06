/*
 * This file is used to build the API routes, we may have 
 * different routes for views and the like
 */

const express = require('express')

const router = express.Router() //make a new router

//const userRoutes = require('./users') //use the user route shit

const taskRoutes = require('./tasks') //use the tasks route 

const projectRoutes = require('./project') //use the project route 

const doingRoutes = require('./doing') //use the doing route

const doneRoutes = require('./done') //use the done route

const todoRoutes = require('./todo') //use the todo route

const novelstoryRoutes = require('./novelstory') //use the novelstory route

const groupRoutes = require('./groups') //use the group route

const authRoutes = require('./auth')

router.use('/project/', projectRoutes) //tell it to use the projectRouter
//router.use('/users/', userRoutes) //tell it to use the userRoutes
router.use('/tasks/', taskRoutes) //tell it to use the tasksRouter
router.use('/project/', projectRoutes) //tell it to use the projectRouter
router.use('/tasks/', taskRoutes) //tell it to use the tasksRouter
router.use('/doing/', doingRoutes) //tell it to use the doingRoutes
router.use('/done/', doneRoutes) //tell it to use the doneRoutes
router.use('/todo/', todoRoutes) //tell it to use the todoRoutes
router.use('/novelstory/', novelstoryRoutes) //tell it to use the novelstoryRoutes
router.use('/auth', authRoutes)
router.use('/group/', groupRoutes)

module.exports = router