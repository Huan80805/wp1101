import axios from "axios";
const instance = 
axios.create({baseURL:"http://localhost:4000/api/guess"})
const startGame = async () => {
    const { data: {msg} }= await instance.post("/start")
    return msg
}
const guess = async (number) => {
    try{
        // get 要用 {params:{:}}傳, post用{:}傳
        const { data: {msg} }= await instance.get("/guess",
        {params: {number:number}})
        return msg
    }
    catch (error) {
        console.log(error)
        return `Error: ${number} is not a valid number`
    }
}
const restart = async() =>{
    const { data: {msg} }= await instance.post("/restart")
    return msg
}
export { startGame, guess, restart}