import * as React from "react";
import rough from "roughjs/bin/rough"; // see https://github.com/rough-stuff/rough/issues/145#issuecomment-616932359
import "./Cell.css";
import { CellNumber, CellState } from "./TicTacToeGame";

interface CellProps {
  cellNum: CellNumber;
  cellState: CellState;
  handleMove: (cellNum: CellNumber) => void;
}

export class Cell extends React.PureComponent<CellProps> {
  private canvasRef: React.RefObject<HTMLCanvasElement>;

  constructor(props: CellProps) {
    super(props);
    this.canvasRef = React.createRef();
  }

  public componentDidUpdate = () => {
    this.drawCellState();
  };

  public componentWillUpdate = () => {
    this.drawCellState();
  };

  public render() {
    return (
      <canvas
        ref={this.canvasRef}
        height="100"
        width="100"
        className="cell"
        id={`cell${this.props.cellNum}`}
        onClick={() => this.props.handleMove(this.props.cellNum)}
        // accessibility
        role="img"
        aria-label={this.props.cellState}
      />
    );
  }

  private drawCellState(): void {
    const canvas = this.canvasRef.current;
    if (canvas && rough) {
      const rc = rough.canvas(canvas);
      if (this.props.cellState === "X") {
        rc.line(20, 20, 80, 80); // top-left to bottom-right
        rc.line(20, 80, 80, 20); // top-right to bottom-left
      } else if (this.props.cellState === "O") {
        rc.circle(50, 50, 60);
      } else {
        // clear any drawings on the canvas
        const context = canvas.getContext("2d");
        if (context) {
          context.clearRect(0, 0, canvas.width, canvas.height);
        }
      }
    }
  }
}
