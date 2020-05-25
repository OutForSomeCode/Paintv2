import {IShapeGroup} from "./IShapeGroup";

/**
 * singleton class, central storage for all shape data on the canvas
 */
class Items {
    private static _instance: Items;
    private _itemArray: IShapeGroup[] = [];
    private _selectedItemsUuids: any[] = [];

    private constructor() {
    }

    /**
     * returns this instance of the class
     */
    public static getInstance() :Items {
        if(!Items._instance){
            Items._instance = new Items();
        }
        return Items._instance;
    }

    /**
     * for saving all shape data
     */
    get itemArray(): IShapeGroup[] {
        return this._itemArray;
    }

    /**
     * for loading all shape data
     * @param value: list with data to load
     */
    set itemArray(value: IShapeGroup[]) {
        this._itemArray = value;
    }

    /**
     * return the current selected uuids
     */
    get selectedItemsUuids(): any[] {
        return this._selectedItemsUuids;
    }

    /**
     * set the current selected uuids
     * @param value: uuids
     */
    set selectedItemsUuids(value: any[]) {
        this._selectedItemsUuids = value;
    }

    /**
     * add new data (shapes and or groups) to the central list
     * @param items: list with data
     */
    public add = (items: IShapeGroup[]): void => {
        this._itemArray = this._itemArray.concat(items);
    }

    /**
     * removes a shape or group
     * @param uuid: ID
     */
    public remove = (uuid: any): IShapeGroup[] => {
        return this._itemArray.splice(this._itemArray.indexOf(this.get(uuid)), 1);
    }

    /**
     * get a shape or group by ID
     * @param uuid: ID
     */
    public get = (uuid: any): IShapeGroup => {
        return this._itemArray.find((item: IShapeGroup) => item.getObjectData().id === uuid) as IShapeGroup;
    }
}
export {Items}