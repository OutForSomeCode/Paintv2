import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Shape} from './shapes/Shape';
import {Circle} from "./shapes/Circle";
import {Square} from "./shapes/Square";

let shapes: any[] = [];

function addShape(event: { clientX: number; clientY: number; }) {
    //@ts-ignore
    let offset = document.getElementById("canvas").getBoundingClientRect();
    shapes.push(new Shape(new Square(), event.clientX - offset.left, event.clientY - offset.top, 50, 50, []))
    //shapes.push(new Circle(event.clientX - offset.left, event.clientY - offset.top, 50));
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
            <div>
                <div id="controls">
                    <h1>{shapes.length}</h1>
                </div>
                <div onClick={this.updateItems}>
                    <svg id="canvas" onClick={addShape}>
                        {shapes.map(function (shape, i) {
                            return (shapes[i].executeStrategy());
                        })}
                    </svg>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
