import React from 'react';
import './index.css';
import {Shape} from './shapes/Shape';
import {Circle} from "./shapes/Circle";
import {Square} from "./shapes/Square";
import {Controls} from "./Controls";

let shapes: any[] = [];

function addShape(event: { clientX: number; clientY: number; }) {
    //@ts-ignore
    let offset = document.getElementById("canvas").getBoundingClientRect();
    shapes.push(new Shape(Controls.type, event.clientX - offset.left, event.clientY - offset.top, 50, 50, []));
}

class Canvas extends React.Component {
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
                <svg id="canvas" onClick={addShape}>
                    {shapes.map(function (shape, i) {
                        return (shapes[i].executeStrategy());
                    })}
                </svg>
            </div>
        );
    }
}
export {Canvas}
