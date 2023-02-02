import './letters.scss';

export const Letters = (props) => {
  const letterRows = [];
  let rowCount = 10;

  props.letters.forEach((letter, index) => {
    let letterState = props.correctLetter.includes(letter)
      ? 'correct'
      : props.incorrectLetters.includes(letter)
      ? 'incorrect'
      : '';

    rowCount = index === 19 ? 9 : rowCount;
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
      <div className='letters'>
        {letterRows.map((button, i) => (
          <div className='row' key={i}>
            {button}
          </div>
        ))}
      </div>
    </section>
  );
};
