import {ICommand} from "./ICommand";
import {Group} from "../shapes/Group";
import {Items} from "../shapes/Items";

const d3 = require("d3");

class CommandRemoveGroup implements ICommand {
    private _itemInstance = Items.getInstance();
    private _selection: any[];
    private _removedGroups: any[] = [];

    constructor(uuids: any[]) {
        this._selection = uuids;
    }

    execute(): boolean {
        this._selection.forEach((uuid) => {
            if (d3.select(`[id="${uuid}"]`).node().tagName === "g") {
                const i = this._itemInstance.get(uuid) as Group;
                this._removedGroups.push(i.getObjectData());
                i.remove();
            }
        });
        return true;
    }

    undo(): void {
        const uuids: any[] = [];
        this._removedGroups.forEach((group) => {
            uuids.length = 0;
            group.items.forEach((item: any) => {
                uuids.push(item.getObjectData().id);
            });
            this._itemInstance.add([new Group(uuids)]);
        });
    }
}

export {CommandRemoveGroup}