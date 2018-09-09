import { mount, ReactWrapper, shallow } from 'enzyme';
import * as React from 'react';
import App, { AppProps, AppState } from './App';
import { StatusBar } from './StatusBar';
import { CellNumber } from './TicTacToeGame';
import { NewGameButton } from './NewGameButton';

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
