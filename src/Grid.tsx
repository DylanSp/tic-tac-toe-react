import * as React from "react";
import rough from "roughjs";
import "./Grid.css";

export class Grid extends React.PureComponent<{}, {}> {
    private canvasRef: React.RefObject<HTMLCanvasElement>;

    constructor(props: {}) {
        super(props);
        this.canvasRef = React.createRef();
    }

    public componentDidMount = () => {
        // TODO - error handling code for if ref doesn't work?
        // second check is necessary for testing;
        // the rough object doesn't exist when using JSDom, even with canvas installed
        if (this.canvasRef.current && rough) {
            const rc = rough.canvas(this.canvasRef.current);
            rc.line(100, 0, 100, 300); // left vertical line
            rc.line(200, 0, 200, 300); // right vertical line
            rc.line(0, 100, 300, 100); // top horizontal line
            rc.line(0, 200, 300, 200); // bottom horizontal line
        }
    }

    public render() {
        return (
            <canvas id="gridCanvas" ref={this.canvasRef} height="300" width="300" className="grid" />
        );
    }
}
