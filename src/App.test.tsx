import { mount, ReactWrapper, shallow } from 'enzyme';
import * as React from 'react';

// have to use this import form so we have an object to pass to jest.spyOn()
import * as Toast from 'react-toastify';

import App, { AppProps, AppState } from './App';
import { NewGameButton } from './NewGameButton';
import { StatusBar } from './StatusBar';
import { CellNumber } from './TicTacToeGame';

// convenience function for making moves
function makeGameMove(app: ReactWrapper<AppProps, AppState>, cellNum: CellNumber): void {
    app.setState((state: AppState) => ({
        game: state.game.makeMove(cellNum)[1] // ignore move result, update game state
    }));
}

it('renders without crashing', () => {
    shallow(<App />);
});

describe("Status bar", () => {
    // TODO - convenience function for checking status bar text?

    let app: ReactWrapper<AppProps, AppState>;

    beforeEach(() => {
        app = mount(<App />);
    });

    afterEach(() => {
        app = app.unmount();
    });

    it("Prompts X to move at game start", () => {
        expect(app.find(StatusBar).text()).toMatch(/Player X to move/);
    });

    it("Prompts O to move after one move", () => {
        makeGameMove(app, 0);
        expect(app.find(StatusBar).text()).toMatch(/Player O to move/);
    });

    it("Prompts X to move after two moves", () => {
        makeGameMove(app, 0);
        makeGameMove(app, 1);
        expect(app.find(StatusBar).text()).toMatch(/Player X to move/);
    });

    it("Announces X has won when appropriate", () => {
        makeGameMove(app, 0); // X moves
        makeGameMove(app, 6); // O moves
        makeGameMove(app, 1); // X moves
        makeGameMove(app, 7); // O moves
        makeGameMove(app, 2); // X moves, completing top row
        expect(app.find(StatusBar).text()).toMatch(/Player X has won!/);
    });

    it("Announces O has won when appropriate", () => {
        makeGameMove(app, 0); // X moves
        makeGameMove(app, 6); // O moves
        makeGameMove(app, 1); // X moves
        makeGameMove(app, 7); // O moves
        makeGameMove(app, 5); // X moves
        makeGameMove(app, 8); // O moves, completing bottom row
        expect(app.find(StatusBar).text()).toMatch(/Player O has won!/);
    });
});

describe("New game button", () => {
    let app: ReactWrapper<AppProps, AppState>;

    beforeEach(() => {
        app = mount(<App />);
    });

    afterEach(() => {
        app = app.unmount();
    });

    it("Resets the game after one move", () => {
        makeGameMove(app, 0);
        app.find(NewGameButton).simulate("click");
        expect(app.state().game.currentPlayer).toBe("PlayerX");
    });
});

describe("Gameboard cells", () => {
    // TODO - convenience function for finding and clicking on a cell?

    let app: ReactWrapper<AppProps, AppState>;

    beforeEach(() => {
        app = mount(<App />);
    });

    afterEach(() => {
        app = app.unmount();
    });

    it("Marks a cell as X when Player X clicks", () => {
        let cell0 = app.find("[cellNum=0]");
        expect(cell0.prop("cellState")).toBe("EMPTY");
        cell0.simulate("click");
        // reset cell0 to reference new component after update, not component from old tree
        cell0 = app.find("[cellNum=0]");
        expect(cell0.prop("cellState")).toBe("X");
    });

    it("Marks a cell as O when Player O clicks", () => {
        // X moves
        const cell0 = app.find("[cellNum=0]");
        cell0.simulate("click");

        // O moves
        let cell1 = app.find("[cellNum=1]");
        expect(cell1.prop("cellState")).toBe("EMPTY");
        cell1.simulate("click");

        // reset cell1 to reference new component after update, not component from old tree
        cell1 = app.find("[cellNum=1]");
        expect(cell1.prop("cellState")).toBe("O");
    });

    it("Shows a message for X's victory when X clicks a winning cell", () => {
        const spy = jest.spyOn(Toast, "toast");

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

        expect(spy).toBeCalledWith("PlayerX has won! Congratulations!")
    });

    it("Shows a message for O's victory when X clicks a winning cell", () => {
        const spy = jest.spyOn(Toast, "toast");

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

        expect(spy).toBeCalledWith("PlayerO has won! Congratulations!")
    });

    it("Shows a message for when a player clicks on an already-filled cell", () => {
        const spy = jest.spyOn(Toast, "toast");

        let cell0 = app.find("[cellNum=0]");
        cell0.simulate("click");

        // reset cell0 to reference new component after update
        cell0 = app.find("[cellNum=0]");
        cell0.simulate("click");
        
        expect(spy).toBeCalledWith("Square is already filled!");
    });

    it("Shows a message for when a player clicks on a cell in a completed game", () => {
        const spy = jest.spyOn(Toast, "toast");

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

        expect(spy).toBeCalledWith("Game is already over!");
    });
});
