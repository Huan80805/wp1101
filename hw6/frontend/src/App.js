import './App.css';
import { useState } from 'react';
import { guess, startGame, restart} from './axios'

function App() {
  const [hasStarted, setHasStarted] = useState(false)
  const [hasWon, setHasWon] = useState(false)
  const [number, setNumber] = useState("")
  const [status, setStatus] = useState("");
  // number checked at backend, return 406 error if illegal number

  const handleGuess = async () => {
    document.getElementById('input').value = "" 
    // set number to backend
    const response = await guess(number)
    if (response === "Equal") setHasWon(true)
    else {
      setStatus(response)
      setNumber("")
    }
  }
  const handleInput = (e) =>{
    setNumber(e.target.value)
  }
  const handleRestart = async() =>{
    await restart()
    setStatus("Restarted")
    setNumber("")
    setHasWon(false)
  }
  const startMenu = 
    <div>
      <button onClick = { async () => { 
        await startGame()
        setHasStarted(true)}
      }> start game
      </button>
    </div>
  const gameMode = 
      <>
        <p> Guess a number between 1 to 100</p>
        <input id = "input" type="text" onChange={handleInput}></input>
        <button //send number to backend
          onClick={handleGuess}
          disabled={!number}
        >guess!</button>
        <p>{status}</p>
      </>
  const winningMode = 
      <>
        <p>you won! the number was {number}.</p>
        <button  //handle restart for backend and frontend
          onClick={handleRestart}
        >Restart</button>
      </>



  const game = 
    <div>
      {hasWon ? winningMode : gameMode}
    </div>

  return (
    <div className="App">
        {hasStarted ? game: startMenu}
    </div>
  );
}

export default App;
