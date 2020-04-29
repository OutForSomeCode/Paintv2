import {Vector2} from "../utility/Vector2";

export interface IShapeGroup {
    draw(): any;
    updatePosition(pos: Vector2): void;
    getPosition(): Vector2;
    getUuid(): any;

    getSize(): Vector2;

    getType(): string;
}