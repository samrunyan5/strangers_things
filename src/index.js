import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

import {
    Register 
} from './components';

const App = () => {
    return (
        <div id='app'>
            <h1>Stranger's Things</h1>
            {console.log('heck from ./src/index.js')}
            <Register />
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)