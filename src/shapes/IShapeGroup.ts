import {IVisitor} from "../visitor/IVisitor";
import {Vector2} from "../utility/Vector2";

export interface IShapeGroup {
    draw(inGroup: boolean, callback: () => void): any;
    getObjectData(): any
    acceptVisitor(v: IVisitor): void;
    updatePosition(translation: Vector2): void;
}