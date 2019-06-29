import { SFC } from "react";
import * as React from "react";
import "./NewGameButton.css";

interface NewGameButtonProps {
    startNewGame: () => void;
}

// button element has an ID so tests can find it
export const NewGameButton: SFC<NewGameButtonProps> = (props) => (
    <div className="newGameButtonContainer">
        <button id="newGameButton" className="newGameButton" type="button" onClick={props.startNewGame}>
            Start New Game
        </button>
    </div>
);
