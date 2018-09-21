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

    constructor(props: CellProps) {
        super(props);
        this.canvasRef = React.createRef();
    }

    public componentDidUpdate = () => {
        this.drawCellState();
    }

    public componentWillUpdate = () => {
        this.drawCellState();
    }

    public render() {
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
        const canvas = this.canvasRef.current;
        if (canvas && rough) {
            const rc = rough.canvas(canvas);
            if (this.props.cellState === "X") {
                rc.line(20, 20, 80, 80); // top-left to bottom-right
                // this.drawAnimatedLine();
                rc.line(20, 80, 80, 20); // top-right to bottom-left
                // this.drawAnimatedXFirst(canvas);
                // this.drawAnimatedXSecond(canvas);
            } else if (this.props.cellState === "O") {
                // rc.circle(50, 50, 60);
                this.drawAnimatedO(canvas);
            } else {
                // clear any drawings on the canvas
                const context = canvas.getContext("2d");
                if (context) {
                    context.clearRect(0, 0, canvas.width, canvas.height);
                }
            }
        }
    }

    /*
    private drawAnimatedLine(): void {
        let start: number;
        let percentProgress: number;
        let xTemp: number;
        let yTemp: number;
        const canvas = this.canvasRef.current;
        let context: CanvasRenderingContext2D | null;
        const xStart = 20;
        const yStart = 20;
        const xEnd = 80;
        const yEnd = 80;
        const duration = 0.5 * 1000; // 10 second duration
        let rc: RoughCanvas | RoughCanvasAsync;

        if (canvas && rough) {
            rc = rough.canvas(canvas);
            context = canvas.getContext("2d");
        }


        const step = (timestamp: number) => {
            if (canvas && context) {
                context.clearRect(0, 0, canvas.width, canvas.height);
            }
            if (!start) {
                start = timestamp;
            }
            percentProgress = (timestamp - start) / duration;
            xTemp = xStart + ((xEnd - xStart) * percentProgress);
            yTemp = yStart + ((yEnd - yStart) * percentProgress);

            rc.line(xStart, yStart, xTemp, yTemp);
            if (percentProgress < 1) {
                window.requestAnimationFrame(step);
            }
        }
        window.requestAnimationFrame(step);
    }
    */

    /**
     * TODO:
     * move magic numbers (20, 80, duration) to constants/class fields/etc.
     * figure out how to make sure First() completes before Second();
     *   may need to explicitly use async and await
     * Potentially return drawable for final line from First(), so Second() preserves its appearance
     *   see if effect is noticeable before bothering with this
     * Move these to separate file?
     * Utility method for clearing the canvas?
     */

    // adapted from example on https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
    /*
    private drawAnimatedXFirst(canvas: HTMLCanvasElement) {
        const rc = rough.canvas(canvas);
        const duration = 5 * 1000; // half-second duration
        let start: number;

        const step = (timestamp: number) => {
            const context = canvas.getContext("2d");
            if (context) {
                // clear existing drawings
                context.clearRect(0, 0, canvas.width, canvas.height);
            }

            if (!start) {
                start = timestamp;
            }

            const progressFraction = (timestamp - start) / duration;
            rc.line(20, 20, 20 + 60 * progressFraction, 20 + 60 * progressFraction);
            if (progressFraction < 1) {
                window.requestAnimationFrame(step);
            }
        }
        window.requestAnimationFrame(step);
    }

    private drawAnimatedXSecond(canvas: HTMLCanvasElement) {
        const rc = rough.canvas(canvas);
        const duration = 0.5 * 1000; // half-second duration
        let start: number;

        const step = (timestamp: number) => {
            const context = canvas.getContext("2d");
            if (context) {
                // clear existing drawings, then re-draw first line
                context.clearRect(0, 0, canvas.width, canvas.height);
                rc.line(20, 20, 80, 80);
            }

            if (!start) {
                start = timestamp;
            }

            const progressFraction = (timestamp - start) / duration;
            rc.line(20, 80, 20 + 60 * progressFraction, 80 - 60 * progressFraction);
            if (progressFraction < 1) {
                window.requestAnimationFrame(step);
            }
        }
        window.requestAnimationFrame(step);
    }
    */

    /** 
     * TODO
     * Crashing the browser tab, apparently? Too computationally intensive?
     * Replace with SVG? https://stackoverflow.com/questions/33778835/radial-wipe-with-pure-css-if-not-svg-alternative
     */
    private drawAnimatedO(canvas: HTMLCanvasElement) {
        const rc = rough.canvas(canvas);
        const duration = 0.5 * 1000;
        let start: number;

        const step = (timestamp: number) => {
            const context = canvas.getContext("2d");
            if (context) {
                // clear existing drawings
                context.clearRect(0, 0, canvas.width, canvas.height);
            }

            if (!start) {
                start = timestamp;
            }

            const progressFraction = (timestamp - start) / duration;
            rc.arc(50, 50, 60, 60, 0, 2 * Math.PI * progressFraction, false);

            if (progressFraction < 1) {
                window.requestAnimationFrame(step);
            }
        }
        window.requestAnimationFrame(step);
    }
}
