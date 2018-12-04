/*
 * This file is used to build the API routes, we may have 
 * different routes for views and the like
 */

const express = require('express')

const router = express.Router() //make a new router

//const userRoutes = require('./users') //use the user route shit

const taskRoutes = require('./tasks') //use the tasks route 

const projectRoutes = require('./project') //use the project route 

const doingRoutes = require('./doings') //use the doing route

const doneRoutes = require('./dones') //use the done route

const todoRoutes = require('./todos') //use the todo route

const novelstoryRoutes = require('./novelstories') //use the novelstory route

const authRoutes = require('./auth')

router.use('/project/', projectRoutes) //tell it to use the projectRouter
//router.use('/users/', userRoutes) //tell it to use the userRoutes
router.use('/tasks/', taskRoutes) //tell it to use the tasksRouter
router.use('/project/', projectRoutes) //tell it to use the projectRouter
router.use('/tasks/', taskRoutes) //tell it to use the tasksRouter
router.use('/doings/', doingRoutes) //tell it to use the doingRoutes
router.use('/dones/', doneRoutes) //tell it to use the doneRoutes
router.use('/todos/', todoRoutes) //tell it to use the todoRoutes
router.use('/novelstories/', novelstoryRoutes) //tell it to use the novelstoryRoutes
router.use('/auth', authRoutes)

module.exports = router