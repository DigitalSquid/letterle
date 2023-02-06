import './board.scss';

export const Board = (props) => {
  return (
    <div className='board'>
      {props.guesses.map((guess, index) => {
        const guessState =
          guess === props.currentGameAnswer ? 'correct' : 'incorrect';
        return (
          <div className={`guess ${guessState}`} key={index}>
            {guess}
          </div>
        );
      })}
      {!props.hasWon && <div className='guess'>&nbsp;</div>}

      <div ref={props.boardEndRef}>
        {props.hasWon && (
          <div>
            <h2>Congratulations!</h2>
            <p>
              You solved the <strong>Letterle</strong> in{' '}
              <strong className='correct-text'>{props.guesses.length}</strong>{' '}
              guess
              {props.guesses.length > 1 ? 'es' : ''}.
            </p>
            <button className='choice' onClick={() => props.resetGame(true)}>
              Mode Select
            </button>
            {props.selectedGameMode === 'unlimited' && (
              <button className='choice' onClick={() => props.resetGame()}>
                Play Again
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
