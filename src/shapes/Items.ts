import {IShapeGroup} from "./IShapeGroup";

class Items {
    private static _instance: Items;
    private _itemArray: IShapeGroup[] = [];

    private constructor() {
    }

    public static getInstance() :Items {
        if(!Items._instance){
            Items._instance = new Items();
        }
        return Items._instance;
    }

    // for saving all shape data
    get itemArray(): IShapeGroup[] {
        return this._itemArray;
    }

    // for loading all shape data
    set itemArray(value: IShapeGroup[]) {
        this._itemArray = value;
    }

    public add = (item: IShapeGroup): void => {
        this._itemArray.push(item);
    }

    public remove = (uuid: any): IShapeGroup[] => {
        return this._itemArray.splice(this._itemArray.indexOf(this.get(uuid)), 1);
    }

    public get = (uuid: any): IShapeGroup => {
        return this._itemArray.find((item: IShapeGroup) => item.getObjectData().id === uuid) as IShapeGroup;
    }
}
export {Items}