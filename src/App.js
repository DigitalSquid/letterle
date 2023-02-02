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

  useEffect(() => {
    scrollToBottom();
  }, [guesses]);

  function selectLetter(e) {
    const button = e.currentTarget;
    const selectedLetter = button.value;
    console.log(correctLetter);
    if (correctLetter.length === 0) {
      if (!button.classList.contains('incorrect')) {
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
