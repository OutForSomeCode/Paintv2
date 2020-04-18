import React, {CSSProperties} from 'react';
import './index.css';
import {Shape} from './shapes/Shape';
import {Controls} from "./controls/Controls";

let shapes: any[] = [];

class Canvas extends React.Component {
    private svgCanvas = React.createRef<SVGSVGElement>();

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

    addShape = (event: { clientX: number; clientY: number; }) => {
        let offset = this.svgCanvas.current!.getBoundingClientRect();
        const styling: CSSProperties = {
            stroke: "black",
            fill: Controls.hexColor
        }
        shapes.push(new Shape(Controls.type, event.clientX - offset.left, event.clientY - offset.top, Controls.width, Controls.height, styling));
        this.updateItems();
    }

    render() {
        return (
            <svg className="fullsize" ref={this.svgCanvas} onClick={this.addShape}>
                {shapes.map(function (shape) {
                    return (shape.executeStrategy());
                })}
            </svg>
        );
    }
}

export {Canvas}
