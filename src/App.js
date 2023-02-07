import { useState, useRef, useEffect } from 'react';

import { GameMode } from './components/gameMode/gameMode';
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
    "1234567890-=qwertyuiop[]asdfghjkl;'zxcvbnm,./"
  );
  const [currentLetters, setCurrentLetters] = useState('');
  const [dailyAnswer] = useState(dailyLetters[dayNumber]);
  const [currentGameAnswer, setCurrentGameAnswer] = useState('');
  const [selectedGameMode, setSelectedGameMode] = useState('');
  const [hasWon, setHasWonState] = useState(false);
  const [guesses, setGuesses] = useState([]);

  const boardEndRef = useRef(null);

  const scrollToBottom = () => {
    boardEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
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
    const selectedLetter = button.value;

    if (!hasWon) {
      if (!button.classList.contains('incorrect')) {
        addGuess(selectedLetter);
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
    setSelectedGameMode(mode);
    setCurrentGameAnswer(mode === 'daily' ? dailyAnswer : generateRandomAnswer);
    setCurrentLetters(mode === 'extreme' ? lettersExtreme : lettersStandard);
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
            <nav>
              <button className='choice' onClick={() => resetGame(true)}>
                Mode Select
              </button>
            </nav>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
