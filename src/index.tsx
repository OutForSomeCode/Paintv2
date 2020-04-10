import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Circle} from './shapes/Circle';

class App extends React.Component {
    shapes = [];

    addShape() {
        //this.shapes.push(new Circle(, , 50));
    }

    test = new Circle(60, 60, 50);

    render() {
        return (
            <div>
                <div id="controls">

                </div>
                <svg id="canvas" onClick={this.addShape}>
                    {this.test.draw()}
                </svg>
            </div>
        );
    }
}


ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
