import { SFC } from "react";
import * as React from "react";
import { Cell } from "./Cell";

export const Gameboard: SFC<{}> = () => (
    <>
        <div>
            <Cell />
            <Cell />
            <Cell />
        </div>
        <div>
            <Cell />
            <Cell />
            <Cell />
        </div>
        <div>
            <Cell />
            <Cell />
            <Cell />
        </div>
    </>
);