import {IVisitor} from "../visitor/IVisitor";

export interface IShapeGroup {
    draw(inGroup: boolean): any;
    getObjectData(): any
    acceptVisitor(v: IVisitor): void;
}