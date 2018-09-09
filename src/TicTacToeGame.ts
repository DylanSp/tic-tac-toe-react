export type Player = "PlayerX" | "PlayerO";
export type MoveResult = "Victory" | "WaitingForMove" | "SquareFilled" | "GameOver";
export type CellNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
type CellState = "X" | "O" | "EMPTY";

export class TicTacToeGame {
    private _currentPlayer: Player;
    private _winningPlayer?: Player;
    private board: CellState[];
    
    constructor () {
        this.board = new Array<CellState>(9);
        this.board.fill("EMPTY");
        this._currentPlayer = "PlayerX";
        this._winningPlayer = undefined;
    }

    public get currentPlayer(): Player {
        return this._currentPlayer;
    }

    public get winningPlayer(): Player | undefined {
        return this._winningPlayer;
    }

    public makeMove(cellNum: CellNumber): [MoveResult, TicTacToeGame] {
        const updatedGame = new TicTacToeGame();
        updatedGame._currentPlayer = this.currentPlayer;
        updatedGame._winningPlayer = this.winningPlayer;
        updatedGame.board = this.board.map(element => element);
        
        if (updatedGame.board[cellNum] !== "EMPTY") {
            return ["SquareFilled", updatedGame];
        }

        if (updatedGame.winningPlayer) {
            return ["GameOver", updatedGame];
        }

        if (updatedGame.currentPlayer === "PlayerX") {
            updatedGame.board[cellNum] = "X";
        } else {
            updatedGame.board[cellNum] = "O";
        }

        updatedGame.checkForVictory();
        if(updatedGame.winningPlayer) {
            return ["Victory", updatedGame];
        }

        if (updatedGame.currentPlayer === "PlayerX") {
            updatedGame._currentPlayer = "PlayerO";
        } else {
            updatedGame._currentPlayer = "PlayerX";
        }
        return ["WaitingForMove", updatedGame];
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

        for (const line in lines) {
            if ((lines[line] as CellState[]).every(cell => cell === "X")) {
                this._winningPlayer = "PlayerX";
                return;
            } else if ((lines[line] as CellState[]).every(cell => cell === "O")) {
                this._winningPlayer = "PlayerO";
                return;
            }
        }
        this._winningPlayer = undefined; // no winning player detected
        return;
    }
}
