// define middleware, the endpoint connecting the front end
import express from 'express'
import clearDB from './api/clearDB.js'
import createCard from './api/createCard.js'
import queryCards from './api/queryCards.js'

const router = express.Router()
// define endpoints
router.delete('/clear-db',(req,res) => {
    clearDB(req,res)
})
router.post('/create-card',(req,res) => {
    createCard(req,res)
})
router.get('/query-cards',(req, res) => {
    queryCards(req,res)
})
export default router