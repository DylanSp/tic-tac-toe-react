import * as React from "react";
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
        if (this.props.isGameOver) {
            if (this.props.winningPlayer === "PlayerX") {
                return("Player X has won!");
            } else if (this.props.winningPlayer === "PlayerO") {
                return("Player O has won!");
            } else if (this.props.winningPlayer === "DrawnGame") {
                return("Game is drawn!");
            } else {
                throw new Error("Game logic error; game is won with unspecified victor");
            }
        } else {
            if (this.props.currentPlayer === "PlayerX") {
                return("Player X to move");
            } else {
                return("Player O to move");
            }
        }
    }
}
