import { TicTacToeGame } from "./TicTacToeGame";

describe("Tic Tac Toe game class", () => {
  it("Recognizes player X's victory correctly", () => {
    const game0 = new TicTacToeGame();
    // [1] needed to get just updated game; ignore result
    const game1 = game0.makeMove(0)[1]; // X moves
    const game2 = game1.makeMove(6)[1]; // O moves
    const game3 = game2.makeMove(1)[1]; // X moves
    const game4 = game3.makeMove(7)[1]; // O moves
    const [result, game5] = game4.makeMove(2); // X moves, completing top row
    expect(result).toBe("GameFinished");
    expect(game5.winningPlayer).toBe("PlayerX");
  });

  it("Recognizes player O's victory correctly", () => {
    const game0 = new TicTacToeGame();
    const game1 = game0.makeMove(0)[1]; // X moves
    const game2 = game1.makeMove(6)[1]; // O moves
    const game3 = game2.makeMove(1)[1]; // X moves
    const game4 = game3.makeMove(7)[1]; // O moves
    const game5 = game4.makeMove(5)[1]; // X moves
    const [result, game6] = game5.makeMove(8); // O moves, completing bottom row
    expect(result).toBe("GameFinished");
    expect(game6.winningPlayer).toBe("PlayerO");
  });

  it("Recognizes a drawn game correctly", () => {
    const game0 = new TicTacToeGame();
    const game1 = game0.makeMove(0)[1]; // X moves
    const game2 = game1.makeMove(1)[1]; // O moves
    const game3 = game2.makeMove(3)[1]; // X moves
    const game4 = game3.makeMove(4)[1]; // O moves
    const game5 = game4.makeMove(7)[1]; // X moves
    const game6 = game5.makeMove(6)[1]; // O moves
    const game7 = game6.makeMove(2)[1]; // X moves
    const game8 = game7.makeMove(5)[1]; // O moves
    const [result, game9] = game8.makeMove(8); // X moves, filling board
    expect(result).toBe("GameFinished");
    expect(game9.winningPlayer).toBe("DrawnGame");
  });

  it("Returns an error when attempting to fill an already-filled square", () => {
    const game0 = new TicTacToeGame();
    const game1 = game0.makeMove(0)[1]; // get updated game, ignore result
    const result = game1.makeMove(0)[0]; // get result, ignore updated game
    expect(result).toBe("SquareFilled");
  });

  it("Returns an error when making a move in a completed game", () => {
    const game0 = new TicTacToeGame();
    const game1 = game0.makeMove(0)[1]; // X moves
    const game2 = game1.makeMove(6)[1]; // O moves
    const game3 = game2.makeMove(1)[1]; // X moves
    const game4 = game3.makeMove(7)[1]; // O moves
    const game5 = game4.makeMove(2)[1]; // X moves, completing top row
    const result = game5.makeMove(3)[0];
    expect(result).toBe("GameAlreadyOver");
  });

  it("Recognizes when it's X's turn", () => {
    const game0 = new TicTacToeGame();
    const game1 = game0.makeMove(0)[1]; // X moves
    const [result, game2] = game1.makeMove(1); // O moves
    expect(result).toBe("WaitingForMove");
    expect(game2.currentPlayer).toBe("PlayerX");
  });

  it("Recognizes when it's O's turn", () => {
    const game0 = new TicTacToeGame();
    const [result, game1] = game0.makeMove(0); // X moves
    expect(result).toBe("WaitingForMove");
    expect(game1.currentPlayer).toBe("PlayerO");
  });
});
