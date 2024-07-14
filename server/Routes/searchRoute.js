import express from 'express'
import { search } from '../Controllers/SearchCn.js'
const searchRoute=express.Router()

searchRoute.route('/').get(search)

export default searchRoute