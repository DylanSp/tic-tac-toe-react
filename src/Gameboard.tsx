import * as React from "react";
import { Cell } from "./Cell";
import "./Gameboard.css";
import { Grid } from "./Grid";
import { CellNumber, CellState } from "./TicTacToeGame";

interface GameboardProps {
  boardState: ReadonlyArray<CellState>;
  handleMove: (cellNum: CellNumber) => void;
}

export const Gameboard = (props: GameboardProps) => (
  <div className="boardWrapper">
    {props.boardState.map((cellState, index) => (
      <Cell
        key={index}
        cellNum={index as CellNumber}
        cellState={cellState}
        handleMove={props.handleMove}
      />
    ))}
    <Grid />
  </div>
);
