import { useState, useRef, useEffect } from 'react';

import { Board } from './components/board/board';
import { Letters } from './components/letters/letters';

import './App.css';

function App() {
  const letters = Array.from('qwertyuiopasdfghjklzxcvbnm');
  const [answer] = useState(
    letters[Math.floor(Math.random() * letters.length)]
  );
  const [incorrectLetters, setIncorrectLetters] = useState([]);
  const [correctLetter, setCorrectLetter] = useState('');
  const [guesses, setGuesses] = useState([]);

  const boardEndRef = useRef(null);

  const scrollToBottom = () => {
    boardEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const keyPress = ({ key }) => {
    if (
      letters.includes(key) &&
      !incorrectLetters.includes(key) &&
      correctLetter.length === 0
    ) {
      addGuess(key);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [guesses]);

  useEffect(() => {
    window.addEventListener('keydown', keyPress);
    return () => {
      window.removeEventListener('keydown', keyPress);
    };
  }, [incorrectLetters, correctLetter]);

  function selectLetter(e) {
    const button = e.currentTarget;
    const selectedLetter = button.value;

    if (correctLetter.length === 0) {
      if (!button.classList.contains('incorrect')) {
        addGuess(selectedLetter);
      }
    }
  }

  function addGuess(selectedLetter) {
    setGuesses((guesses) => [...guesses, selectedLetter]);

    if (selectedLetter === answer) {
      setCorrectLetter(selectedLetter);
    } else {
      setIncorrectLetters((incorrectLetters) => [
        ...incorrectLetters,
        selectedLetter,
      ]);
    }
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Letterdle</h1>
      </header>
      <main>
        <Board
          guesses={guesses}
          correctLetter={correctLetter}
          boardEndRef={boardEndRef}
        />
        <Letters
          correctLetter={correctLetter}
          incorrectLetters={incorrectLetters}
          letters={letters}
          selectLetter={selectLetter}
        />
      </main>
    </div>
  );
}

export default App;
