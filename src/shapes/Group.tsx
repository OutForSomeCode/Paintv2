import React from "react";
import {Items} from "./Items";
import {G} from "../components/G";
import {IShapeGroup} from "./IShapeGroup";
import {IVisitor} from "../visitor/IVisitor";
import {Vector2} from "../utility/Vector2";

const uuid = require('react-uuid');

class Group implements IShapeGroup {
    private readonly _uuid: any = null;
    private _items: IShapeGroup[] = [];
    private _shapeInstance = Items.getInstance();

    constructor(uuids: any[]) {
        this.add(uuids);
        this._uuid = uuid();
    }

    draw = (inGroup: boolean, callback: () => void): any => {
        return <G key={this._uuid} id={this._uuid} ingroup={inGroup} update={callback}>
            {this._items.map((item: IShapeGroup) => (
                item.draw(true, callback)
            ))}
        </G>
    }

    updatePosition(translation: Vector2): void {
        this._items.forEach((item: IShapeGroup) => {
            item.updatePosition(translation);
        })
    }

    add(shapeUuids: any[]): void {
        if (shapeUuids.length > 0) {
            shapeUuids.forEach((uuid) => {
                this._items.push(this._shapeInstance.remove(uuid)[0]);
            });
        }
    }

    remove(): void {
        this._items.forEach((item) => {
            this._shapeInstance.add(this._items.splice(this._items.indexOf(item.getObjectData().id), 1)[0])
        });
    }

    acceptVisitor(v: IVisitor): void {
        v.visitGroup(this);
    }

    getObjectData(): any {
        return {
            id: this._uuid,
            items: this._items
        }
    }
}

export {Group}