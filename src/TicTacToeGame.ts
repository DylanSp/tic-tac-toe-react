export type Player = "PlayerX" | "PlayerO";
export type MoveResult = "Victory" | "WaitingForMove" | "SquareFilled" | "GameOver";
export type CellNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type CellState = "X" | "O" | "EMPTY";

export class TicTacToeGame {
    private _currentPlayer: Player;
    private _winningPlayer?: Player;
    private _board: CellState[];
    
    constructor () {
        this._board = new Array<CellState>(9).fill("EMPTY");
        this._currentPlayer = "PlayerX";
        this._winningPlayer = undefined;
    }

    public get currentPlayer(): Player {
        return this._currentPlayer;
    }

    public get winningPlayer(): Player | undefined {
        return this._winningPlayer;
    }

    public get board(): ReadonlyArray<CellState> {
        return this._board;
    }

    public makeMove(cellNum: CellNumber): [MoveResult, TicTacToeGame] {
        const updatedGame = new TicTacToeGame();
        updatedGame._currentPlayer = this.currentPlayer;
        updatedGame._winningPlayer = this.winningPlayer;
        updatedGame._board = this._board.map(element => element);
        
        if (updatedGame._board[cellNum] !== "EMPTY") {
            return ["SquareFilled", updatedGame];
        }

        if (updatedGame.winningPlayer) {
            return ["GameOver", updatedGame];
        }

        if (updatedGame.currentPlayer === "PlayerX") {
            updatedGame._board[cellNum] = "X";
        } else {
            updatedGame._board[cellNum] = "O";
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
            "row1": [this._board[0], this._board[1], this._board[2]],
            "row2": [this._board[3], this._board[4], this._board[5]],
            "row3": [this._board[6], this._board[7], this._board[8]],

            "col1": [this._board[0], this._board[3], this._board[6]],
            "col2": [this._board[1], this._board[4], this._board[7]],
            "col3": [this._board[2], this._board[5], this._board[8]],

            "diag1": [this._board[0], this._board[5], this._board[8]],
            "diag2": [this._board[3], this._board[5], this._board[7]]
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
