import {IShapeGroup} from "./IShapeGroup";

class Shapes {
    private static _instance: Shapes;
    private _shapeArray: IShapeGroup[] = [];

    private constructor() {
    }

    public static getInstance() :Shapes {
        if(!Shapes._instance){
            Shapes._instance = new Shapes();
        }
        return Shapes._instance;
    }

    // for saving all shape data
    get shapeArray(): IShapeGroup[] {
        return this._shapeArray;
    }

    // for loading all shape data
    set shapeArray(value: IShapeGroup[]) {
        this._shapeArray = value;
    }

    public add = (item: IShapeGroup): void => {
        this._shapeArray.push(item);
    }

    public remove = (uuid: any): IShapeGroup[] => {
        return this._shapeArray.splice(this._shapeArray.indexOf(this.get(uuid)), 1);
    }

    public get = (uuid: any): IShapeGroup => {
        return this._shapeArray.find((item: IShapeGroup) => item.getObjectData().id === uuid) as IShapeGroup;
    }
}
export {Shapes}