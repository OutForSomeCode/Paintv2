import React from "react";
import {Items} from "./Items";
import {G} from "../components/G";
import {IShapeGroup} from "./IShapeGroup";
import {IVisitor} from "../visitor/IVisitor";
import {Vector2} from "../utility/Vector2";
import {BBox} from "../utility/BBox";

const uuid = require('react-uuid');

class Group implements IShapeGroup {
    private readonly _uuid: any;
    private _bbox: BBox = new BBox(0, 0, 0, 0);
    private _items: IShapeGroup[] = [];
    private _itemInstance = Items.getInstance();

    constructor(uuids: any[]) {
        this._uuid = uuid();
        this.add(uuids);
    }

    draw = (inGroup: boolean, callback: () => void): any => {
        return <G key={this._uuid} id={this._uuid} ingroup={inGroup} update={callback}>
            {this._items.map((item: IShapeGroup) => (
                item.draw(true, callback)
            ))}
        </G>
    }

    updatePosition(translation: Vector2): void {
        this._bbox.updatePosition(translation);
        this._items.forEach((item: IShapeGroup) => {
            item.updatePosition(translation);
        })
    }

    updateSize(scale: Vector2, bbox: any) {
        this._items.forEach((item: IShapeGroup) => {
            const itemBBox = item.getObjectData().bbox;
            const newBbox = new BBox(
                (itemBBox.top - this._bbox.top) * scale.y + bbox.top,
                (itemBBox.bottom - this._bbox.bottom) * scale.y + bbox.bottom,
                (itemBBox.left - this._bbox.left) * scale.x + bbox.left,
                (itemBBox.right - this._bbox.right) * scale.x + bbox.right,
            );
            item.updateSize(scale, newBbox);
        });
        this._bbox = bbox;
    }

    updateBBox(bbox: BBox) {
        this._bbox = bbox;
    }

    add(uuids: any[]) {
        uuids.forEach((uuid) => {
            this._items.push(this._itemInstance.remove(uuid)[0]);
        });
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
            items: this._items,
            bbox: this._bbox
        }
    }
}

export {Group}