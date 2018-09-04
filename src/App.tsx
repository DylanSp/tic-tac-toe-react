import * as React from 'react';
import { Gameboard } from './Gameboard';
import { NewGameButton } from './NewGameButton';
import { StatusBar } from './StatusBar';

class App extends React.Component<{}, {}> {
    public render() {
        return (
            <>
                <Gameboard />
                <StatusBar />
                <NewGameButton />
            </>
        );
    }
}

export default App;
