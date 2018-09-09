import * as React from 'react';
import { Gameboard } from './Gameboard';
import { NewGameButton } from './NewGameButton';
import { StatusBar } from './StatusBar';
import { TicTacToeGame } from './TicTacToeGame';

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
                <Gameboard />
                <StatusBar
                    isGameWon={!!this.state.game.winningPlayer} 
                    currentPlayer={this.state.game.currentPlayer}
                    winningPlayer={this.state.game.winningPlayer}
                />
                <NewGameButton startNewGame={() => this.setState({game: new TicTacToeGame()})} />
            </div>
        );
    }
}

export default App;
