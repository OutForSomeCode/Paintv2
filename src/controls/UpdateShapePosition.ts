import {Items} from "../shapes/Items";
import {ICommand} from "./ICommand";
import {Vector2} from "../utility/Vector2";
import {Shape} from "../shapes/Shape";

class UpdateShapePosition implements ICommand {
    private _items = Items.getInstance();
    private _shape: Shape;
    private readonly _oldPos: Vector2;
    private readonly _newPos: Vector2;

    constructor(uuid: any, pos: Vector2) {
        this._shape = this._items.get(uuid) as Shape;
        this._oldPos = new Vector2(this._shape.getObjectData().pos.x, this._shape.getObjectData().pos.y);
        this._newPos = new Vector2(pos.x, pos.y);
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

export {UpdateShapePosition}