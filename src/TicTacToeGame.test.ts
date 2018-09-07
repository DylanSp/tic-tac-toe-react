import { TicTacToeGame } from "./TicTacToeGame";

describe ("Tic Tac Toe game class", () => {
    it("Recognizes player X's victory correctly", () => {
        const game = new TicTacToeGame();
        game.makeMove(0); // X moves
        game.makeMove(6); // O moves
        game.makeMove(1); // X moves
        game.makeMove(7); // O moves
        const result = game.makeMove(2); // X moves, completing top row
        expect(result === "Victory");
        expect(game.winningPlayer === "PlayerX");
    });

    it("Recognizes player O's victory correctly", () => {
        const game = new TicTacToeGame();
        game.makeMove(0); // X moves
        game.makeMove(6); // O moves
        game.makeMove(1); // X moves
        game.makeMove(7); // O moves
        game.makeMove(5); // X moves
        const result = game.makeMove(8); // O moves, completing bottom row
        expect(result === "Victory");
        expect(game.winningPlayer === "PlayerO");
    });

    it ("Returns an error when attempting to fill an already-filled square", () => {
        const game = new TicTacToeGame();
        game.makeMove(0);
        const result = game.makeMove(0);
        expect(result === "SquareFilled");
    });

    it ("Returns an error when making a move in a completed game", () => {
        const game = new TicTacToeGame();
        game.makeMove(0); // X moves
        game.makeMove(6); // O moves
        game.makeMove(1); // X moves
        game.makeMove(7); // O moves
        game.makeMove(2); // X moves, completing top row
        const result = game.makeMove(3);
        expect(result === "GameOver");
    });

    it("Recognizes when it's X's turn", () => {
        const game = new TicTacToeGame();
        game.makeMove(0); // X moves
        const result = game.makeMove(1); // O moves
        expect(result === "WaitingForMove");
        expect(game.currentPlayer === "PlayerX");
    });

    it("Recognizes when it's O's turn", () => {
        const game = new TicTacToeGame();
        const result = game.makeMove(0); // X moves
        expect(result === "WaitingForMove");
        expect(game.currentPlayer === "PlayerO");
    });
});