import {Items} from "../shapes/Items";
import {ICommand} from "./ICommand";
import {Vector2} from "../utility/Vector2";
import {MoveVisitor} from "../visitor/MoveVisitor";
import {Group} from "../shapes/Group";

class UpdateGroupPosition implements ICommand {
    private _items = Items.getInstance();
    private _item: Group;
    private _oldBBox: Vector2;
    private _newBBox: Vector2;

    constructor(uuid: any, bBox: Vector2, translation: Vector2) {
        this._item = this._items.get(uuid) as Group;
        this._oldBBox = bBox;
        this._newBBox = new Vector2(bBox.x + translation.x, bBox.y + translation.y);
    }

    execute = (): boolean => {
        // updates posX, posY values to current position
        this._item.acceptVisitor(new MoveVisitor(this._newBBox, this._oldBBox));
        return true;
    }

    undo = (): void => {
        // updates posX, posY values to the old position
        this._item.acceptVisitor(new MoveVisitor(this._oldBBox, this._newBBox));
    }
}

export {UpdateGroupPosition}