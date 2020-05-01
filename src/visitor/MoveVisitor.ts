import {IVisitor} from "./IVisitor";
import {Shape} from "../shapes/Shape";
import {Group} from "../shapes/Group";
import {Vector2} from "../utility/Vector2";
import {IShapeGroup} from "../shapes/IShapeGroup";

class MoveVisitor implements IVisitor {
    private _to: Vector2;
    private _from: Vector2;

    constructor(to: Vector2, from: Vector2) {
        this._to = to;
        this._from = from;
    }

    visitGroup(g: Group): void {
        g.getObjectData().items.forEach((item: IShapeGroup) => {
            item.acceptVisitor(this);
        });
    }

    visitShape(s: Shape): void {
        const shape = s.getObjectData();
        const translate = new Vector2(
            this._to.x - this._from.x,
            this._to.y - this._from.y
        );
        const newPos = new Vector2(
            shape.pos.x + translate.x,
            shape.pos.y + translate.y
        );
        s.updatePosition(newPos);
    }

}

export {MoveVisitor}