import express from 'express'
import { search } from '../Controllers/SearchCn.js'
const searchRoute=express.Router()

searchRoute.route('/').post(search)

export default searchRoute