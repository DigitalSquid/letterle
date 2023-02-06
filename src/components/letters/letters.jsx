import './letters.scss';

export const Letters = (props) => {
  const letterRows = [];
  let rowCount = 0;
  let rowEndMarker = 0;
  let rowLength = 0;
  if (props.isExtreme) {
    rowCount = 20;
    rowEndMarker = 12;
    rowLength = 12;
  } else {
    rowCount = 10;
    rowEndMarker = 19;
    rowLength = 9;
  }
  props.letters.forEach((letter, index) => {
    let letterState =
      props.currentGameAnswer === letter && props.hasWon
        ? 'correct'
        : props.guesses.includes(letter)
        ? 'incorrect'
        : '';

    rowCount = index === rowEndMarker ? rowLength : rowCount;
    let rowIndex = Math.floor(index / rowCount);
    letterRows[rowIndex] = [
      ...(letterRows[rowIndex] || []),
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
