import {Shape} from "./Shape";
import {Shapes} from "./Shapes";

const uuid = require('react-uuid');

class Group {
    private readonly _uuid: any = null;
    private _shapes: Shape[];
    private _shapeInstance = Shapes.getInstance();

    constructor(shapes: Shape[]) {
        this._shapes = shapes;
        this._uuid = uuid();
    }

    add(shapes: Shape[]): void {
        shapes.forEach((shape) => {
            this._shapes.push(this._shapeInstance.remove(shape.getUuid())[0]);
        });
    }

    remove(): void {

    }

    getUuid(): any {
        return this._uuid;
    }
}
export {Group}