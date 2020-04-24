import React from 'react';
import {Shape} from '../shapes/Shape';
import {Controls} from "../controls/Controls";
import {Shapes} from "../shapes/Shapes";
import {CreateShape} from "../controls/CreateShape";
import {Commands} from "../controls/Commands";

class Canvas extends React.Component<any, any> {
    private _svgCanvas = React.createRef<SVGSVGElement>();
    private _commands = Commands.getCommands();
    private _shapes = Shapes.getShapes();

    constructor(props: any) {
        super(props);
        this.state = {
            shapes: [],
        };
    }

    updateItems = () => {
        this.setState({
                shapes: this._shapes.shapeArray
            }
        )
    };

    addShape = (event: { clientX: number; clientY: number; }) => {
        let offset = this._svgCanvas.current!.getBoundingClientRect();
        this._commands.push(
            new CreateShape(
                new Shape(
                    Controls.type,
                    event.clientX - offset.left,
                    event.clientY - offset.top,
                    Controls.width,
                    Controls.height,
                    Controls.styling
                )
            )
        );
        this.updateItems();
    }

    render() {
        return (
            <svg className="fullsize" ref={this._svgCanvas} onClick={this.addShape}>
                {this.state.shapes.map((shape: Shape) => (
                    shape.draw()
                ))}
            </svg>
        );
    }
}

export {Canvas}