const GameFactory = () => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const setSign = (index, sign) => {
    if (!(index > board.length)) {
      board[index] = sign;
    }
  };

  const getSign = (index){
    if (!(index > board.length)) {
      return board[index];
    }
  }

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

const initializeGame = (() => {})();
