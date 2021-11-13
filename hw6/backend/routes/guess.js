import express from 'express'
import { getNumber, genNumber } from '../core/getNumber'
const router = express.Router()

function roughScale(x, base) {
    var parsed = Number.parseInt(x, base);
    if (Number.isNaN(parsed)) {
      return 0;
    }
    return parsed ;
  }
router.post('/start', (req, res) => {
  genNumber() // random generated, note: imported and number is "global"
  res.json({ msg: 'The game has started.' })
})
router.get('/guess', (req, res) => {
  const number = getNumber()
  const guessed = roughScale(req.query.number, 10)
  // check if NOT a num or not in range [1,100]
  console.log(number,guessed)
  if (!guessed || guessed < 1 || guessed > 100) {
    res.status(406).send({ msg: 'Not a legal number.' })
  } 
  else if (number === guessed) {res.status(200).send({msg: 'Equal'})}
  else if (number > guessed) {res.status(200).send({msg:'Bigger'})}
  else if (number < guessed) {res.status(200).send({msg:'Smaller'})}
})
router.post('/restart', (_, res) => {
    console.log(genNumber())
    res.json({msg: 'The game has restarted'})
})
export default router
