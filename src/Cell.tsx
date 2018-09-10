import { SFC } from "react";
import * as React from "react";
import { CellNumber, CellState } from "./TicTacToeGame";

interface CellProps {
    cellNum: CellNumber;
    cellState: CellState;
    handleMove: (cellNum: CellNumber) => void;
}

export const Cell: SFC<CellProps> = (props) => (
    <button type="button" onClick={() => props.handleMove(props.cellNum)}>
        {props.cellNum}
        {props.cellState}
    </button>
);