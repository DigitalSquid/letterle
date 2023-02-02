import { useState, useRef, useEffect } from 'react';

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
        <div className='board'>
          {guesses.length === 0 ? (
            <div className='guess'>&nbsp;</div>
          ) : (
            guesses.map((guess, index) => {
              const guessState =
                guess === correctLetter ? 'correct' : 'incorrect';
              return (
                <div className={`guess ${guessState}`} key={index}>
                  {guess}
                </div>
              );
            })
          )}

          <div ref={boardEndRef}>
            {correctLetter.length === 1 && (
              <div>
                <h2>Congratulations!</h2>
                <p>
                  You solved the Letterdle in{' '}
                  <strong className='correct-text'>{guesses.length}</strong>{' '}
                  guess
                  {guesses.length > 1 ? 'es' : ''}.
                </p>
              </div>
            )}
          </div>
        </div>
        <Letters
          letters={letters}
          selectLetter={selectLetter}
          incorrectLetters={incorrectLetters}
          correctLetter={correctLetter}
        />
      </main>
    </div>
  );
}

export default App;
