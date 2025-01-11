import './gameMode.scss';

export const GameMode = (props) => {
  const gameModes = ['daily', 'unlimited', 'extreme'];
  return (
    <div className='game-mode'>
      {props.selectedGameMode === '' ? (
        <>
          {gameModes.map((mode, index) => (
            <button
              className={`choice ${mode}`}
              key={index}
              onClick={() => props.selectGameMode(mode)}
            >
              {mode}
            </button>
          ))}
        </>
      ) : (
        <h2>{props.selectedGameMode} mode</h2>
      )}
    </div>
  );
};

export const ChangeGameMode = (props) => {
  return (
    <nav>
      <button className='choice' onClick={() => props.resetGame(true)}>
        Change Game Mode
      </button>
    </nav>
  );
};
