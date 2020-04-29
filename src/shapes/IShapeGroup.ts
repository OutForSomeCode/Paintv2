import {Vector2} from "../utility/Vector2";
import {IVisitor} from "../visitor/IVisitor";

export interface IShapeGroup {
    draw(inGroup: boolean): any;
    updatePosition(pos: Vector2): void;
    getObjectData(): any
    acceptVisitor(v: IVisitor): void;
}