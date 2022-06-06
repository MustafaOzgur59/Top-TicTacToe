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

const PlayerFactory = (playerSign) => {
  this.sign = playerSign;

  const getSign = () => {
    return playerSign;
  };

  return { getSign };
};

const pageControllerModule = (() => {
  const playerTurnMessage = document.getElementById("turn");
  const gridElements = document.querySelectorAll(".gridItem");
  const restartBtn = document.getElementById("restart");
  gridElements.forEach((element) => {
    element.addEventListener("click", (e) => {
      if (!gameControllerModule.getIsOver() && e.target.textContent === "") {
        gameControllerModule.play(parseInt(e.target.dataset.order));
      }
      update();
    });
  });

  restartBtn.addEventListener("click", (e) => {
    gameControllerModule.getGame().reset();
    gameControllerModule.resetGame();
    update();
    setTurnMessage("Player X's turn");
  });

  const update = () => {
    for (let i = 0; i < gridElements.length; i++) {
      gridElements[i].textContent = gameControllerModule.getGame().getSign(i);
    }
  };

  const setTurnMessage = (msg) => {
    playerTurnMessage.textContent = msg;
  };

  const setWinMessage = (win) => {
    if (win === "Draw") {
      setTurnMessage("It's a draw!");
    } else {
      setTurnMessage(`Player ${win} has won!`);
    }
  };

  return { setTurnMessage, setWinMessage };
})();

const gameControllerModule = (() => {
  const game = GameFactory();
  const PlayerX = PlayerFactory("X");
  const PlayerO = PlayerFactory("O");
  let turnCount = 1;
  let isOver = false;

  const play = (index) => {
    game.setSign(index, getCurrentPlayerSign());
    if (winCheck(index)) {
      isOver = true;
      pageControllerModule.setWinMessage(getCurrentPlayerSign());
      console.log("Here1");
      return;
    }
    if (turnCount == 9) {
      isOver = true;
      pageControllerModule.setWinMessage("Draw");
      console.log("Here2");
      return;
    } else {
      pageControllerModule.setTurnMessage(
        `Player ${getCurrentPlayerSign()}'s turn`
      );
      turnCount++;
      console.log("Here3");
      return;
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

  const getCurrentPlayerSign = () => {
    return turnCount % 2 === 1 ? PlayerX.getSign() : PlayerO.getSign();
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
      .filter((comb) => comb.includes(clickedIndex))
      .some((possibleWin) =>
        possibleWin.every(
          (index) => game.getSign(index) === getCurrentPlayerSign()
        )
      );
  };

  const getGame = () => {
    return game;
  };
  return { play, getIsOver, resetGame, getGame };
})();
