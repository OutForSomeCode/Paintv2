import {Vector2} from "../utility/Vector2";

export interface IShape {
    getType(): string;
    draw(index: number, cenPos: Vector2, size: Vector2, style: any, inGroup: boolean): any;
}