import {ICommand} from "./ICommand";
import {Items} from "../shapes/Items";
import {IShapeGroup} from "../shapes/IShapeGroup";
import {Vector2} from "../utility/Vector2";
import {BBox} from "../utility/BBox";

const d3 = require("d3");

class CommandResizeSelected implements ICommand {
    private _items = Items.getInstance();
    private _shape: IShapeGroup;
    private readonly _newData: BBox;
    private readonly _oldData: BBox;
    private readonly _oldScale: Vector2;
    private readonly _newScale: Vector2;

    constructor(uuid: any, oldData: any) {
        const selected = d3.select(`[id="${uuid}"]`).node().getBBox();

        this._shape = this._items.get(uuid);
        this._oldData = new BBox(oldData.y, oldData.y + oldData.height, oldData.x, oldData.x + oldData.width);
        this._newData = new BBox(selected.y, selected.y + selected.height, selected.x, selected.x + selected.width);

        this._oldScale = new Vector2(
            this.scale(this._newData.width, this._oldData.width),
            this.scale(this._newData.height, this._oldData.height)
        );
        this._newScale = new Vector2(
            this.scale(this._oldData.width, this._newData.width),
            this.scale(this._oldData.height, this._newData.height)
        );
    }

    scale = (oldSize: number, newSize: number): number => {
        return (1 / oldSize) * newSize;
    }

    execute = (): boolean => {
        this._shape.updateSize(this._newScale, this._newData);
        return true;
    }

    undo = (): void => {
        this._shape.updateSize(this._oldScale, this._oldData);
        console.log(this._oldScale, this._oldData);
    }
}

export {CommandResizeSelected}