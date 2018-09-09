import { mount, ReactWrapper, shallow } from 'enzyme';
import * as React from 'react';
import App, { AppProps, AppState } from './App';
import { StatusBar } from './StatusBar';
// import { StatusBar } from './StatusBar';

it('renders without crashing', () => {
    shallow(<App />);
});

describe("Status bar", () => {
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
        app.state().game.makeMove(0);
        expect(app.find(StatusBar).text()).toMatch(/Player O to move/);
    });

    it("Prompts X to move after two moves", () => {
        expect(false).toBe(true);
    });

    it("Announces X has won when appropriate", () => {
        expect(false).toBe(true);
    });

    it("Announces O has won when appropriate", () => {
        expect(false).toBe(true);
    });
});
