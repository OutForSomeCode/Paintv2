import {Items} from "../shapes/Items";
import {ICommand} from "./ICommand";
import {Vector2} from "../utility/Vector2";
import {IShapeGroup} from "../shapes/IShapeGroup";

class CommandUpdatePosition implements ICommand {
    private _items = Items.getInstance();
    private _shape: IShapeGroup;
    private readonly _oldPos: Vector2;
    private readonly _newPos: Vector2;

    constructor(uuid: any, translation: Vector2) {
        this._shape = this._items.get(uuid);
        this._oldPos = new Vector2(translation.x * -1, translation.y * -1);
        this._newPos = new Vector2(translation.x, translation.y);
    }

    execute = (): boolean => {
        // updates posX, posY values to current position
        this._shape.updatePosition(this._newPos);
        return true;
    }

    undo = (): void => {
        // updates posX, posY values to the old position
        this._shape.updatePosition(this._oldPos);
    }
}

export {CommandUpdatePosition}