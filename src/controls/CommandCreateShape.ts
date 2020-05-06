import {Shape} from "../shapes/Shape";
import {Items} from "../shapes/Items";
import {ICommand} from "./ICommand";

class CommandCreateShape implements ICommand {
    private _shapeInstance = Items.getInstance();
    private _shape: Shape;

    constructor(shape: Shape) {
        this._shape = shape;
    }

    execute(): boolean {
        this._shapeInstance.add([this._shape]);
        return true;
    }

    undo(): void {
        this._shapeInstance.remove(this._shape.getObjectData().id);
    }
}

export {CommandCreateShape}