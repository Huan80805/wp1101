import scoreCard from "../../models/scoreCard.js";
// req: params:{type:"name"/"subject", queryString:..}
// res: message(cards), message(found?)

const queryCards = async(req, res) => {
    const {type, queryString} = req.query
    let cards
    let messages = []
    if (type === "name") cards = await scoreCard.find({name:queryString})
    else cards = await scoreCard.find({subject:queryString})
    if (cards.length !== 0){
        cards.map((card) =>{
            const {name, subject, score} = card
            const message = `Found (${name}, ${subject}, ${score})`
            messages.push(message)
        })
        res.json({messages:messages, message:true})
    }
    else res.json({messages:false, message:`${type}(${queryString}) not found`})

}

export default queryCards