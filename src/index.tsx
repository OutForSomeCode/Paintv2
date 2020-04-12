import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Controls} from "./Controls";
import {Canvas} from "./Canvas";

class App extends React.Component {
    render() {
        return (
            <div>
                <Controls/>
                <Canvas/>
            </div>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
