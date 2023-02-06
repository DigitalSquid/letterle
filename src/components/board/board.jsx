import './board.scss';

export const Board = (props) => {
  return (
    <div className='board'>
      {props.guesses.length === 0 ? (
        <div className='guess'>&nbsp;</div>
      ) : (
        props.guesses.map((guess, index) => {
          const guessState =
            guess === props.correctLetter ? 'correct' : 'incorrect';
          return (
            <div className={`guess ${guessState}`} key={index}>
              {guess}
            </div>
          );
        })
      )}

      <div ref={props.boardEndRef}>
        {props.correctLetter.length === 1 && (
          <div>
            <h2>Congratulations!</h2>
            <p>
              You solved the <strong>Letterle</strong> in{' '}
              <strong className='correct-text'>{props.guesses.length}</strong>{' '}
              guess
              {props.guesses.length > 1 ? 'es' : ''}.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
