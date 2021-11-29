// req: name, subject, score
// res: message, card
import scoreCard from '../../models/scoreCard.js'
const creactCard = async(req, res) => {
    // console.log(req.body)
    const name = req.body.name
    const subject = req.body.subject
    const score = req.body.score
    const existing = await scoreCard.findOne({name:name, subject:subject});
    if (existing) {
        // update score and sent message back
        // usage: updateOne(filter, updatevalue)
        // if (existing.score == score){
        //     res.json({message:`(${name}, ${subject}, ${score}) existed already`, card:false})
        // }
        // else{
        await scoreCard.updateOne({name:name, subject:subject},{score:score})
        res.json({message:`Updating (${name}, ${subject}, ${score})`, card:true})
        // }
    }
    else {
        try {
            const newScoreCard = new scoreCard({name:name, subject:subject, score:score});
            await newScoreCard.save();
            res.json({message:`Adding (${name}, ${subject}, ${score})`, card:true})
        }   
        catch (e) {res.json({message:"error occured during creating card", card:false})}
    }
}

export default creactCard