import * as React from 'react';
import { Gameboard } from './Gameboard';
import { NewGameButton } from './NewGameButton';
import { StatusBar } from './StatusBar';
import { CellNumber, TicTacToeGame } from './TicTacToeGame';

export type AppProps = any;

export interface AppState {
    game: TicTacToeGame;
}

class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state= {game: new TicTacToeGame()};
    }

    public render() {
        return (
            <div>
                Hello!
                <Gameboard
                    boardState={this.state.game.board}
                    handleMove={this.handleMove}
                />
                <StatusBar
                    isGameWon={!!this.state.game.winningPlayer} 
                    currentPlayer={this.state.game.currentPlayer}
                    winningPlayer={this.state.game.winningPlayer}
                />
                <NewGameButton startNewGame={() => this.setState({game: new TicTacToeGame()})} />
            </div>
        );
    }

    // Needs to be a lambda in order to avoid bug with "this"
    public handleMove = (cellNum: CellNumber): void => {
        const [result, updatedGame] = this.state.game.makeMove(cellNum);
        switch (result) {
            case "GameOver":
                window.alert("Game is already over!");
                break;
            case "SquareFilled":
                window.alert("Square is already filled!");
                break;
            case "Victory":
                window.alert(`${updatedGame.winningPlayer} has won! Congratulations!`);
                this.setState({game: updatedGame});
                break;
            case "WaitingForMove":
                this.setState({game: updatedGame});
                break;
        }
    }
}

export default App;
