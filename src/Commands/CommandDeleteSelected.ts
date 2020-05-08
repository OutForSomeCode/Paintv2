import {ICommand} from "./ICommand";
import {Items} from "../shapes/Items";
import {IShapeGroup} from "../shapes/IShapeGroup";

class CommandDeleteSelected implements ICommand{
    private _itemInstance = Items.getInstance();
    private _selection: any[];
    private _deletedItems: IShapeGroup[] = [];

    constructor(uuids: any[]) {
        this._selection = uuids;
    }

    execute(): boolean {
        this._selection.forEach((uuid) => {
            this._deletedItems = this._deletedItems.concat(this._itemInstance.remove(uuid));
        });
        return true;
    }

    undo(): void {
        this._itemInstance.add(this._deletedItems);
        this._deletedItems.length = 0;
    }
}

export {CommandDeleteSelected}