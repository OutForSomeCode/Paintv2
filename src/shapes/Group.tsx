import React from "react";
import {Items} from "./Items";
import {G} from "../components/G";
import {IShapeGroup} from "./IShapeGroup";
import {IVisitor} from "../visitor/IVisitor";
import {Vector2} from "../utility/Vector2";

const uuid = require('react-uuid');

class Group implements IShapeGroup {
    private readonly _uuid: any;
    private _items: IShapeGroup[] = [];
    private _itemInstance = Items.getInstance();

    constructor(uuids: any[]) {
        this._uuid = uuid();
        uuids.forEach((uuid) => {
            this._items.push(this._itemInstance.remove(uuid)[0]);
        });
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

    remove(): void {
        this._itemInstance.add(this._items);
        this._itemInstance.remove(this._uuid);
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