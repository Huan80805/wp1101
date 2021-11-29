import scoreCard from "../../models/scoreCard.js"
// req:none
// res:Database cleared
const clearDB = async(req, res) => {
    try {
        await scoreCard.deleteMany({});
        res.json({message: "Database cleared"})
    } 
    catch (e) {res.json({message:"error occured during clearing database"})}; 

}
export default clearDB