import {ICommand} from "./ICommand";
import {Items} from "../shapes/Items";
import {Group} from "../shapes/Group";

class CommandCreateGroup implements ICommand{
    private _itemInstance = Items.getInstance();
    private _uuid: any = null;
    private _selection: any[];

    constructor(uuids: any[]) {
        this._selection = uuids;
    }

    execute(): boolean {
        const g = new Group(this._selection);
        this._uuid = g.getObjectData().id;
        this._itemInstance.add([g]);
        return true;
    }

    undo(): void {
        const g = this._itemInstance.get(this._uuid) as Group;
        g.remove();
    }
}

export {CommandCreateGroup}