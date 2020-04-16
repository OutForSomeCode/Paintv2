import React, {CSSProperties} from 'react';
import './index.css';
import {Shape} from './shapes/Shape';
import {Controls} from "./controls/Controls";

let shapes: any[] = [];

function addShape(event: { clientX: number; clientY: number; }) {
    let offset = document.getElementById("canvas")!.getBoundingClientRect();
    const styling: CSSProperties = {
        stroke: "black",
        fill: "#cccccc"
    }
    shapes.push(new Shape(Controls.type, event.clientX - offset.left, event.clientY - offset.top, Controls.width, Controls.height, styling));
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
            <div className="fullsize" onClick={this.updateItems}>
                <svg className="fullsize" id="canvas" onClick={addShape}>
                    {shapes.map(function (shape, i) {
                        return (shapes[i].executeStrategy());
                    })}
                </svg>
            </div>
        );
    }
}
export {Canvas}
