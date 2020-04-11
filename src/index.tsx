import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Circle} from './shapes/Circle';

let shapes: any[] = [];

//shapes.push(new Circle(60, 60, 50));

function addShape(event: { clientX: number; clientY: number; }) {
    shapes.push(new Circle(event.clientX, event.clientY, 50));
}

class App extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            shapes,
        };
    }

    updateItems = () => {
        this.setState(state => {
            const shapes = state;
            return {
                shapes,
            };
        });
    };

    render() {
        return (
            <div onClick={this.updateItems}>
                <div id="controls">
                    <h1>{shapes.length}</h1>
                </div>

                <svg id="canvas" onClick={addShape}>
                    {shapes.map(function (shape, i) {
                        return (shapes[i].draw());
                    })}
                </svg>
            </div>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
