const GameFactory = () => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const setSign = (index, sign) => {
    if (!(index > board.length)) {
      board[index] = sign;
    }
  };

  const getSign = (index) => {
    if (!(index > board.length)) {
      return board[index];
    }
  };

  const reset = () => {
    for (let i = 0; i < 9; i++) {
      board[i] = "";
    }
  };
  return { setSign, getSign, reset };
};

const PlayerFactory = (player_sign) => {
  this.sign = player_sign;
  const getSign = () => {
    return sign;
  };
  return { getSign };
};

const pageControllerModule = (() => {})();

const gameControllerModule = (() => {
  const game = GameFactory();
  const PlayerX = PlayerFactory("X");
  const PlayerO = PlayerFactory("O");
  let turnCount = 1;
  let isOver = false;

  const play = (index) => {
    game.setSign(
      index,
      turnCount % 2 == 0 ? PlayerO.getSign() : PlayerX.getSign()
    );
    // TODO: check win
    if (winCheck(index)) {
      isOver = true;
      // TODO: change the p element inside the html to win

      return;
    } else {
      if (turnCount == 9) {
        isOver = true;
        // change p element inside html to draw
      } else {
        turnCount++;
        // change p element inside html to next player
      }
    }
  };
  const getTurnCount = () => {
    return turnCount;
  };

  const resetGame = () => {
    turnCount = 1;
    isOver = false;
    game.reset();
  };

  const getIsOver = () => {
    return isOver;
  };

  const winCheck = (clickedIndex) => {
    winConds = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    return winConds
      .filter((possibleCond) => {
        possibleCond.includes(clickedIndex);
      })
      .some((possibleCond2) => {
        possibleCond2.every((index) => {
          game.getSign(index) ===
            (turnCount % 2 == 0 ? PlayerO.getSign() : PlayerX.getSign());
        });
      });
  };
  return { play, getIsOver, resetGame };
})();
