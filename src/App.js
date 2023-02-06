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

  const letters = Array.from('qwertyuiopasdfghjklzxcvbnm');
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
      if (letters.includes(key) && !guesses.includes(key) && !hasWon) {
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
    setSelectedGameMode(mode);
    setCurrentGameAnswer(mode === 'daily' ? dailyAnswer : generateRandomAnswer);
  }

  function generateRandomAnswer() {
    return letters[Math.floor(Math.random() * letters.length)];
  }

  function resetGame(resetGameMode) {
    if (resetGameMode) {
      setSelectedGameMode('');
    }
    setCurrentGameAnswer(generateRandomAnswer);
    setGuesses([]);
    setHasWonState(false);
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
              hasWon={hasWon}
              guesses={guesses}
              letters={letters}
              selectLetter={selectLetter}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
