import * as React from "react";
import "./StatusBar.css";
import { Player, WinningPlayer } from "./TicTacToeGame";

interface StatusBarProps {
    isGameOver: boolean;
    currentPlayer: Player;
    winningPlayer: WinningPlayer;
}

export class StatusBar extends React.PureComponent<StatusBarProps> {
    constructor(props: StatusBarProps) {
        super(props);
    }

    public render() {
        let text: string;

        if (this.props.isGameOver) {
            if (this.props.winningPlayer === "PlayerX") {
                text = "Player X has won!";
            } else if (this.props.winningPlayer === "PlayerO") {
                text = "Player O has won!";
            } else if (this.props.winningPlayer === "DrawnGame") {
                text = "Game is drawn!";
            } else {
                throw new Error("Game logic error; game is won with unspecified victor");
            }
        } else {
            if (this.props.currentPlayer === "PlayerX") {
                text = "Player X to move";
            } else {
                text = "Player O to move";
            }
        }

        return (
            <div className="statusBarContainer">
                {text}
            </div>
        );
    }
}
