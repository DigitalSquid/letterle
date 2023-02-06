import gameModes from '../../data/gameModes';

import './gameMode.scss';

export const GameMode = (props) => {
  return (
    <div className='game-mode'>
      {props.selectedGameMode === '' ? (
        <>
          <p>Select a game mode:</p>
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
