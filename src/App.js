// import logo from './logo.svg';
import './App.css';
import Board from './components/Board';
import { useEffect, useState } from 'react';
import levelService from './services/level.service';
import LevelComplete from './components/LevelComplete';

function App() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [levels, setLevels] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const [gameDone, setGameDone] = useState(false);

  useEffect(() => {
    async function fetchLevels() {
      const newLevels = await levelService();
      setLevels(newLevels);
    }
    fetchLevels()
  }, [levels]);

  function getLevel(value) {
    setCurrentLevel(value);
    setIsComplete(false);
  }

  function levelComplete() {
    setIsComplete(true);
    if (currentLevel === levels.length - 1) {
      setGameDone(true);
    }
  }


  return (
    <div className="App">
      <button onClick={() => getLevel(currentLevel)}>Reset level</button>
      <Board level={levels[currentLevel]} onLevelComplete={levelComplete} />
      {isComplete
        ? <LevelComplete
          message={gameDone ? 'Congrats! You beat Sokoban.' : 'Level Complete!'}
          previousLevel={() => getLevel(currentLevel - 1)}
          nextLevel={() => getLevel(currentLevel + 1)}
          done={gameDone} />
        : null
      }
    </div>
  );
}

export default App;
