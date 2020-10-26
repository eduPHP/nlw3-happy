import React from 'react';
import './styles/global.css'

import Routes from './routes'
import {AppProvider} from './contexts/app'

function App() {

    return (
        <AppProvider>
            <Routes/>
        </AppProvider>
    );
}

export default App;
