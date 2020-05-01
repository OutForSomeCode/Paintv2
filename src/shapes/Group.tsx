import React from "react";
import {Items} from "./Items";
import {G} from "../components/G";
import {IShapeGroup} from "./IShapeGroup";
import {IVisitor} from "../visitor/IVisitor";

const uuid = require('react-uuid');

class Group implements IShapeGroup {
    private readonly _uuid: any = null;
    private _items: IShapeGroup[];
    private _shapeInstance = Items.getInstance();

    constructor(items: IShapeGroup[]) {
        this._items = items;
        this._uuid = uuid();
    }

    draw = (inGroup: boolean): any => {
        return <G key={this._uuid} id={this._uuid} ingroup={inGroup}>
            {this._items.map((item: IShapeGroup) => (
                item.draw(true)
            ))}
        </G>
    }

    add(shapeUuids: any[]): void {
        shapeUuids.forEach((uuid) => {
            this._items.push(this._shapeInstance.remove(uuid)[0] as IShapeGroup);
        });
    }

    remove(): void {

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