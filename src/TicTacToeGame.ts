export type Player = "PlayerX" | "PlayerO";
export type MoveResult = "GameFinished" | "WaitingForMove" | "SquareFilled" | "GameAlreadyOver";
export type CellNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type CellState = "X" | "O" | "EMPTY";
export type WinningPlayer = Player | "DrawnGame" | undefined;

export class TicTacToeGame {
    private _currentPlayer: Player;
    private _winningPlayer: WinningPlayer;
    private _board: CellState[];
    
    constructor () {
        this._board = new Array<CellState>(9).fill("EMPTY");
        this._currentPlayer = "PlayerX";
        this._winningPlayer = undefined;
    }

    public get currentPlayer(): Player {
        return this._currentPlayer;
    }

    public get winningPlayer(): WinningPlayer {
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
            return ["GameAlreadyOver", updatedGame];
        }

        if (updatedGame.currentPlayer === "PlayerX") {
            updatedGame._board[cellNum] = "X";
        } else {
            updatedGame._board[cellNum] = "O";
        }

        updatedGame.checkForEnd();
        if(updatedGame.winningPlayer) {
            return ["GameFinished", updatedGame];
        }

        if (updatedGame.currentPlayer === "PlayerX") {
            updatedGame._currentPlayer = "PlayerO";
        } else {
            updatedGame._currentPlayer = "PlayerX";
        }
        return ["WaitingForMove", updatedGame];
    }

    private checkForEnd (): void {
        const lines = [
            [this._board[0], this._board[1], this._board[2]],
            [this._board[3], this._board[4], this._board[5]],
            [this._board[6], this._board[7], this._board[8]],

            [this._board[0], this._board[3], this._board[6]],
            [this._board[1], this._board[4], this._board[7]],
            [this._board[2], this._board[5], this._board[8]],

            [this._board[0], this._board[4], this._board[8]],
            [this._board[2], this._board[4], this._board[6]],
        ];

        for (const line of lines) {
            if (line.every(cell => cell === "X")) {
                this._winningPlayer = "PlayerX";
                return;
            } else if (line.every(cell => cell === "O")) {
                this._winningPlayer = "PlayerO";
                return;
            }
        }

        // check for draw
        if (this._board.every(cell => cell !== "EMPTY")) {
            this._winningPlayer = "DrawnGame";
            return;
        }

        this._winningPlayer = undefined; // no winning player detected
        return;
    }
}
