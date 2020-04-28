import React from "react";
import {Shape} from "./Shape";
import {Shapes} from "./Shapes";
import {G} from "../components/G";
import {IShapeGroup} from "./IShapeGroup";

const uuid = require('react-uuid');

class Group implements IShapeGroup {
    private readonly _uuid: any = null;
    private _cenPosX: number;
    private _cenPosY: number;
    private _shapes: IShapeGroup;
    private _shapeInstance = Shapes.getInstance();

    constructor(items: IShapeGroup, cx: number, cy: number) {
        this._shapes = items;
        this._cenPosX = cx;
        this._cenPosY = cy;
        this._uuid = uuid();
    }

    draw = (): any => {
        return <G key={this._uuid} id={this._uuid}>
            {this._shapes.map((shape: Shape) => (
                shape.draw()
            ))}
        </G>
    }

    public updatePosition = (x: number, y: number) => {
        this._cenPosX = x;
        this._cenPosY = y;
    }

    getPosition(): number[] {
        return [this._cenPosX, this._cenPosY];
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
}

export {Group}