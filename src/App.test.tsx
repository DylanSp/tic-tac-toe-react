import { mount, ReactWrapper, shallow } from "enzyme";
import * as React from "react";
import { toast } from "react-toastify";
import App, { AppProps, AppState } from "./App";
import { StatusBar } from "./StatusBar";
import { CellNumber } from "./TicTacToeGame";

// convenience function for making moves
function makeGameMove(app: ReactWrapper<AppProps, AppState>, cellNum: CellNumber): void {
    app.setState((state: AppState) => ({
        game: state.game.makeMove(cellNum)[1], // ignore move result, update game state
    }));
}

it("renders without crashing", () => {
    shallow(<App />);
});

describe("Gameboard cells", () => {
    let app: ReactWrapper<AppProps, AppState>;

    beforeEach(() => {
        app = mount(<App />);
    });

    afterEach(() => {
        app = app.unmount();
    });

    it("Shows a message for X's victory when X clicks a winning cell", () => {
        const spy = jest.spyOn(toast, "success");

        // X moves
        const cell0 = app.find("[cellNum=0]");
        cell0.simulate("click");

        // O moves
        const cell6 = app.find("[cellNum=6]");
        cell6.simulate("click");

        // X moves
        const cell1 = app.find("[cellNum=1]");
        cell1.simulate("click");

        // O moves
        const cell7 = app.find("[cellNum=7]");
        cell7.simulate("click");

        // X moves, completing top row
        const cell2 = app.find("[cellNum=2]");
        cell2.simulate("click");

        // check first argument of first call to toast.success()
        expect(spy.mock.calls[0][0]).toMatch(/PlayerX has won/);
        spy.mockClear();
    });

    it("Shows a message for O's victory when O clicks a winning cell", () => {
        const spy = jest.spyOn(toast, "success");

        // X moves
        const cell0 = app.find("[cellNum=0]");
        cell0.simulate("click");

        // O moves
        const cell6 = app.find("[cellNum=6]");
        cell6.simulate("click");

        // X moves
        const cell1 = app.find("[cellNum=1]");
        cell1.simulate("click");

        // O moves
        const cell7 = app.find("[cellNum=7]");
        cell7.simulate("click");

        // X moves
        const cell4 = app.find("[cellNum=4]");
        cell4.simulate("click");

        // O moves, completing bottom row
        const cell8 = app.find("[cellNum=8]");
        cell8.simulate("click");

        // check first argument of first call to toast.success()
        expect(spy.mock.calls[0][0]).toMatch(/PlayerO has won/);
        spy.mockClear();
    });

    it("Shows a message for drawn game when board is filled without a winner", () => {
        const spy = jest.spyOn(toast, "info");

        // X moves
        const cell0 = app.find("[cellNum=0]");
        cell0.simulate("click");

        // O moves
        const cell1 = app.find("[cellNum=1]");
        cell1.simulate("click");

        // X moves
        const cell3 = app.find("[cellNum=3]");
        cell3.simulate("click");

        // O moves
        const cell4 = app.find("[cellNum=4]");
        cell4.simulate("click");

        // X moves
        const cell7 = app.find("[cellNum=7]");
        cell7.simulate("click");

        // O moves
        const cell6 = app.find("[cellNum=6]");
        cell6.simulate("click");

        // X moves
        const cell2 = app.find("[cellNum=2]");
        cell2.simulate("click");

        // O moves
        const cell5 = app.find("[cellNum=5]");
        cell5.simulate("click");

        // X moves, filling board
        const cell8 = app.find("[cellNum=8]");
        cell8.simulate("click");

        // check first argument of first call to toast.info()
        expect(spy.mock.calls[0][0]).toMatch(/Game drawn/);
        spy.mockClear();
    });

    it("Shows a message for when a player clicks on an already-filled cell", () => {
        const spy = jest.spyOn(toast, "error");

        let cell0 = app.find("[cellNum=0]");
        cell0.simulate("click");

        // reset cell0 to reference new component after update
        cell0 = app.find("[cellNum=0]");
        cell0.simulate("click");

        // check first argument of first call to toast.error()
        expect(spy.mock.calls[0][0]).toMatch(/Square is already filled/);
        spy.mockClear();
    });

    it("Shows a message for when a player clicks on a cell in a completed game", () => {
        const spy = jest.spyOn(toast, "error");

        // X moves
        const cell0 = app.find("[cellNum=0]");
        cell0.simulate("click");

        // O moves
        const cell6 = app.find("[cellNum=6]");
        cell6.simulate("click");

        // X moves
        const cell1 = app.find("[cellNum=1]");
        cell1.simulate("click");

        // O moves
        const cell7 = app.find("[cellNum=7]");
        cell7.simulate("click");

        // X moves, completing top row
        const cell2 = app.find("[cellNum=2]");
        cell2.simulate("click");

        // move that should trigger notification
        const cell4 = app.find("[cellNum=4]");
        cell4.simulate("click");

        // check first argument of SECOND call to toast()
        // first call to toast() was from game being won
        expect(spy.mock.calls[0][0]).toMatch(/Game is already over/);
        spy.mockClear();
    });
});
