import * as React from "react";
import rough from "roughjs";
import "./Cell.css";
import { CellNumber, CellState } from "./TicTacToeGame";

interface CellProps {
    cellNum: CellNumber;
    cellState: CellState;
    handleMove: (cellNum: CellNumber) => void;
}

export class Cell extends React.PureComponent<CellProps> {
    private canvasRef: React.RefObject<HTMLCanvasElement>

    constructor (props: CellProps) {
        super(props);
        this.canvasRef = React.createRef();
    }

    public componentDidUpdate = () => {
        this.drawCellState();
    }

    public componentWillUpdate = () => {
        this.drawCellState();
    }

    public render () {
        return (
            <canvas
                ref={this.canvasRef}
                height="100"
                width="100"
                className="cell"
                onClick={() => this.props.handleMove(this.props.cellNum)}
            />
        );
    }

    private drawCellState(): void {
        if (this.canvasRef.current && rough) {
            const rc = rough.canvas(this.canvasRef.current);
            if (this.props.cellState === "X") {
                rc.line(20, 20, 80, 80); // top-left to bottom-right
                rc.line(20, 80, 80, 20); // top-right to bottom-left
            } else if (this.props.cellState === "O") {
                rc.circle(50, 50, 60);
            }
        }
    }
}
