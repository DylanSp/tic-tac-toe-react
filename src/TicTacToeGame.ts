type CellState = "X" | "O" | "EMPTY";
type Player = "PlayerX" | "PlayerO";
type MoveResult = "Victory" | "WaitingForMove" | "SquareFilled" | "GameOver";
type CellNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export class TicTacToeGame {
    public currentPlayer?: Player;
    public winningPlayer?: Player;
    private board: CellState[];
    
    constructor () {
        this.board = new Array<CellState>(9);
        this.board.fill("EMPTY");
        this.currentPlayer = "PlayerX";
        this.winningPlayer = undefined;
    }

    public makeMove(cellNum: CellNumber): MoveResult {
        if (this.board[cellNum] !== "EMPTY") {
            return "SquareFilled";
        }

        if (this.winningPlayer) {
            return "GameOver";
        }

        if (this.currentPlayer === "PlayerX") {
            this.board[cellNum] = "X";
        } else {
            this.board[cellNum] = "O";
        }

        this.checkForVictory();
        if(this.winningPlayer) {
            return "Victory";
        }

        if (this.currentPlayer === "PlayerX") {
            this.currentPlayer = "PlayerO";
        } else {
            this.currentPlayer = "PlayerX";
        }
        return "WaitingForMove";
    }

    private checkForVictory (): void {
        const lines = {
            "row1": [this.board[0], this.board[1], this.board[2]],
            "row2": [this.board[3], this.board[4], this.board[5]],
            "row3": [this.board[6], this.board[7], this.board[8]],

            "col1": [this.board[0], this.board[3], this.board[6]],
            "col2": [this.board[1], this.board[4], this.board[7]],
            "col3": [this.board[2], this.board[5], this.board[8]],

            "diag1": [this.board[0], this.board[5], this.board[8]],
            "diag2": [this.board[3], this.board[5], this.board[7]]
        }

        // exit early or check everything, then error on inconsistent state?
        for (const line in lines) {
            if ((lines[line] as CellState[]).every(cell => cell === "X")) {
                this.winningPlayer = "PlayerX";
            } else if ((lines[line] as CellState[]).every(cell => cell === "O")) {
                this.winningPlayer = "PlayerO";
            } else {
                this.winningPlayer = undefined;
            }
        }

    }
}