import {ICommand} from "./ICommand";
import {Group} from "../shapes/Group";
import {Items} from "../shapes/Items";

const d3 = require("d3");

class CommandRemoveGroup implements ICommand {
    private _itemInstance = Items.getInstance();
    private _selection: any[];

    constructor(uuids: any[]) {
        this._selection = uuids;
    }

    execute(): boolean {
        this._selection.forEach((uuid) => {
            if (d3.select(`[id="${uuid}"]`).node().tagName === "g") {
                const i = this._itemInstance.get(uuid) as Group;
                i.remove();
            }
        });
        return true;
    }

    undo(): void {
    }
}

export {CommandRemoveGroup}