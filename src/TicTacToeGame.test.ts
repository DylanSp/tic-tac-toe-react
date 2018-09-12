import { TicTacToeGame } from "./TicTacToeGame";

// convert repetitive code to some sort of fp-ts State monad?

describe ("Tic Tac Toe game class", () => {
    it("Recognizes player X's victory correctly", () => {
        const game0 = new TicTacToeGame();
        // [1] needed to get just updated game; ignore result
        const game1 = game0.makeMove(0)[1]; // X moves
        const game2 = game1.makeMove(6)[1]; // O moves
        const game3 = game2.makeMove(1)[1]; // X moves
        const game4 = game3.makeMove(7)[1]; // O moves
        const [result, game5] = game4.makeMove(2); // X moves, completing top row
        expect(result).toBe("Victory");
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
        expect(result).toBe("Victory");
        expect(game6.winningPlayer).toBe("PlayerO");
    });

    it ("Returns an error when attempting to fill an already-filled square", () => {
        const game0 = new TicTacToeGame();
        const game1 = game0.makeMove(0)[1]; // get updated game, ignore result
        const result = game1.makeMove(0)[0]; // get result, ignore updated game
        expect(result).toBe("SquareFilled");
    });

    it ("Returns an error when making a move in a completed game", () => {
        const game0 = new TicTacToeGame();
        const game1 = game0.makeMove(0)[1]; // X moves
        const game2 = game1.makeMove(6)[1]; // O moves
        const game3 = game2.makeMove(1)[1]; // X moves
        const game4 = game3.makeMove(7)[1]; // O moves
        const game5 = game4.makeMove(2)[1]; // X moves, completing top row
        const result = game5.makeMove(3)[0];
        expect(result).toBe("GameOver");
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