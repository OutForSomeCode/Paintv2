import React from "react";
import {Shapes} from "./Shapes";
import {G} from "../components/G";
import {IShapeGroup} from "./IShapeGroup";
import {Vector2} from "../utility/Vector2";

const uuid = require('react-uuid');

class Group implements IShapeGroup {
    private readonly _uuid: any = null;
    private _cenPos: Vector2;
    private _shapes: IShapeGroup[];
    private _shapeInstance = Shapes.getInstance();

    constructor(items: IShapeGroup[], c: Vector2) {
        this._shapes = items;
        this._cenPos = c;
        this._uuid = uuid();
    }

    draw = (): any => {
        return <G key={this._uuid} id={this._uuid}>
            {this._shapes.map((item: IShapeGroup) => (
                item.draw()
            ))}
        </G>
    }

    public updatePosition = (p: Vector2) => {
        this._cenPos = p;
    }

    getPosition(): Vector2 {
        return this._cenPos;
    }

    getUuid(): any {
        return this._uuid;
    }

    add(shapeUuids: any[]): void {
        shapeUuids.forEach((uuid) => {
            this._shapes.push(this._shapeInstance.remove(uuid)[0] as IShapeGroup);
        });
    }

    remove(): void {

    }

    getSize(): Vector2 {
        return new Vector2(0,0);
    }

    getType(): string {
        return "Group";
    }
}

export {Group}