import {Shape} from "./Shape";

class Shapes {
    private static _instance: Shapes;
    private _shapeArray: Shape[] = [];
app: any

    private constructor() {
    }

    public static getShapes() :Shapes {
        if(!Shapes._instance){
            Shapes._instance = new Shapes();
        }
        return Shapes._instance;
    }

    // for saving all shape data
    get shapeArray(): Shape[] {
        return this._shapeArray;
    }

    // for loading all shape data
    set shapeArray(value: Shape[]) {
        this._shapeArray = value;
    }

    public add = (shape: Shape) => {
        this._shapeArray.push(shape);
    }

    public remove = (uuid: any) => {
        this._shapeArray.splice(this._shapeArray.indexOf(this.get(uuid)), 1);
    }

    public get = (uuid: any): Shape => {
        return this._shapeArray.find((shape: Shape) => shape.uuid === uuid) as Shape;
    }
}
export {Shapes}