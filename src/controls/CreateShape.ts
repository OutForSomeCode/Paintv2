import {Shape} from "../shapes/Shape";
import {Shapes} from "../shapes/Shapes";
import {ICommand} from "./ICommand";

class CreateShape implements ICommand {
    private _shapeInstance = Shapes.getInstance();
    private _shape: Shape;

    constructor(shape: Shape) {
        this._shape = shape;
    }

    execute(): boolean {
        this._shapeInstance.add(this._shape);
        return true;
    }

    undo(): void {
        this._shapeInstance.remove(this._shape.getUuid());
    }
}

export {CreateShape}