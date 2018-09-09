import { SFC } from "react";
import * as React from "react";

interface NewGameButtonProps {
    startNewGame: () => void;
}

export const NewGameButton: SFC<NewGameButtonProps> = (props) => (
    <button type="button" onClick={props.startNewGame}>
        Start New Game
    </button>
);