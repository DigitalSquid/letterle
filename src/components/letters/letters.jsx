import './letters.scss';

export const Letters = (props) => {
  const letterRows = [];
  const extremeRowLength = [11, 23, 35, 46];
  const standardRowLength = [9, 18, 25];
  const rowLength = props.isExtreme ? extremeRowLength : standardRowLength;
  let rowCount = 0;

  props.letters.forEach((letter, index) => {
    let letterState =
      props.currentGameAnswer === letter && props.hasWon
        ? 'correct'
        : props.guesses.includes(letter)
        ? 'incorrect'
        : '';

    letterRows[rowCount] = [
      ...(letterRows[rowCount] || []),
      <button
        key={index}
        type='button'
        value={letter}
        className={letterState}
        onClick={props.selectLetter}
      >
        {letter}
      </button>,
    ];

    rowCount = index === rowLength[rowCount] ? rowCount + 1 : rowCount;
  });

  return (
    <section>
      <h2>Available letters</h2>
      <div className={`letters ${props.isExtreme ? 'extreme-mode' : ''}`}>
        {letterRows.map((button, i) => (
          <div className='row' key={i}>
            {button}
          </div>
        ))}
      </div>
    </section>
  );
};
