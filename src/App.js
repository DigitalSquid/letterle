import { useEffect, useRef, useState } from 'react';

import { ChangeGameMode, GameMode } from './components/gameMode/gameMode';
import { Board } from './components/board/board';
import { Letters } from './components/letters/letters';

import dailyLetters from './data/dailyLetters.js';
import './App.css';

function App() {
  const date = new Date();
  const dayNumber =
    (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
      Date.UTC(date.getFullYear(), 0, 0)) /
    24 /
    60 /
    60 /
    1000;

  const lettersStandard = Array.from('qwertyuiopasdfghjklzxcvbnm');
  const lettersExtreme = Array.from(
    '!"£$%^&*()_+1234567890-=qwertyuiop[]asdfghjkl;\'zxcvbnm,./'
  );
  const [currentGameAnswer, setCurrentGameAnswer] = useState('');
  const [currentLetters, setCurrentLetters] = useState('');
  const [dailyAnswer] = useState(dailyLetters[dayNumber]);
  const [guesses, setGuesses] = useState([]);
  const [hasWon, setHasWonState] = useState(false);
  const [selectedGameMode, setSelectedGameMode] = useState('');

  const boardEndRef = useRef(null);

  useEffect(() => {
    boardEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [guesses]);

  useEffect(() => {
    const keyPress = ({ key }) => {
      if (currentLetters.includes(key) && !guesses.includes(key) && !hasWon) {
        addGuess(key);
      }
    };

    window.addEventListener('keydown', keyPress);
    return () => {
      window.removeEventListener('keydown', keyPress);
    };
  });

  function selectLetter(e) {
    const button = e.currentTarget;

    if (!hasWon) {
      if (!button.classList.contains('incorrect')) {
        addGuess(button.value);
      }
    }
  }

  function addGuess(selectedLetter) {
    setGuesses((guesses) => [...guesses, selectedLetter]);

    if (selectedLetter === currentGameAnswer) {
      setHasWonState(true);
    }
  }

  function selectGameMode(mode) {
    resetGame();
    setCurrentLetters(mode === 'extreme' ? lettersExtreme : lettersStandard);
    setCurrentGameAnswer(mode === 'daily' ? dailyAnswer : generateRandomAnswer);
    setSelectedGameMode(mode);
  }

  function generateRandomAnswer() {
    return currentLetters[Math.floor(Math.random() * currentLetters.length)];
  }

  function resetGame(resetGameMode) {
    if (resetGameMode) {
      setSelectedGameMode('');
    } else {
      setCurrentGameAnswer(generateRandomAnswer);
      setGuesses([]);
      setHasWonState(false);
    }
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Letterle</h1>
      </header>
      <main>
        <GameMode
          selectedGameMode={selectedGameMode}
          selectGameMode={selectGameMode}
        />
        {selectedGameMode !== '' && (
          <>
            <Board
              boardEndRef={boardEndRef}
              currentGameAnswer={currentGameAnswer}
              guesses={guesses}
              hasWon={hasWon}
              resetGame={resetGame}
              selectedGameMode={selectedGameMode}
            />
            <Letters
              currentGameAnswer={currentGameAnswer}
              guesses={guesses}
              hasWon={hasWon}
              isExtreme={selectedGameMode === 'extreme'}
              letters={currentLetters}
              selectLetter={selectLetter}
            />
            <ChangeGameMode resetGame={resetGame} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
