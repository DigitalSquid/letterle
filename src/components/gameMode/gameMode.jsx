import gameModes from '../../data/gameModes';

export const GameMode = (props) => {
  return (
    <div className='game-mode'>
      {props.selectedGameMode === '' ? (
        <>
          <p>Select a game mode:</p>
          {gameModes.map((mode, index) => (
            <button
              className='choice'
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
