import * as React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { Gameboard } from "./Gameboard";
import { NewGameButton } from "./NewGameButton";
import { StatusBar } from "./StatusBar";
import { CellNumber, TicTacToeGame } from "./TicTacToeGame";

export type AppProps = any;

export interface AppState {
  game: TicTacToeGame;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = { game: new TicTacToeGame() };
  }

  public render() {
    return (
      <div>
        <ToastContainer />
        <div className="visibleElementsContainer">
          <StatusBar
            isGameOver={!!this.state.game.winningPlayer}
            currentPlayer={this.state.game.currentPlayer}
            winningPlayer={this.state.game.winningPlayer}
          />
          <Gameboard
            boardState={this.state.game.board}
            handleMove={this.handleMove}
          />
          <NewGameButton
            startNewGame={() => this.setState({ game: new TicTacToeGame() })}
          />
        </div>
      </div>
    );
  }

  // Needs to be a lambda in order to avoid bug with "this"
  public handleMove = (cellNum: CellNumber): void => {
    const [result, updatedGame] = this.state.game.makeMove(cellNum);
    switch (result) {
      case "GameAlreadyOver":
        toast.error("Game is already over!", {
          hideProgressBar: true,
        });
        break;
      case "SquareFilled":
        toast.error("Square is already filled!", {
          hideProgressBar: true,
        });
        break;
      case "GameFinished":
        if (updatedGame.winningPlayer === "DrawnGame") {
          toast.info("Game drawn!", {
            hideProgressBar: true,
          });
        } else {
          toast.success(
            `${updatedGame.winningPlayer} has won! Congratulations!`,
            {
              hideProgressBar: true,
            }
          );
        }
        this.setState({ game: updatedGame });
        break;
      case "WaitingForMove":
        this.setState({ game: updatedGame });
        break;
    }
  };
}

export default App;
