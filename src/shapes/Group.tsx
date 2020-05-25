import React from "react";
import {Items} from "./Items";
import {G} from "../components/G";
import {IShapeGroup} from "./IShapeGroup";
import {IVisitor} from "../visitor/IVisitor";
import {Vector2} from "../utility/Vector2";
import {BBox} from "../utility/BBox";

const uuid = require('react-uuid');

/**
 * baseclass for groups containing a list shape data
 */
class Group implements IShapeGroup {
    private readonly _uuid: any;
    private _bbox: BBox = new BBox(0, 0, 0, 0);
    private _items: IShapeGroup[] = [];
    private _itemInstance = Items.getInstance();

    /**
     * create group and move the selected shapes into this group
     * @param uuids: selected ID's
     */
    constructor(uuids: any[]) {
        this._uuid = uuid();
        this.add(uuids);
    }

    /**
     * call draw on all shapes or groups in this group (returns html <element>)
     * @param inGroup: bool to check if its in a group
     * @param callback: callback to the update function in index.tsx
     */
    draw = (inGroup: boolean, callback: () => void): any => {
        return <G key={this._uuid} id={this._uuid} ingroup={inGroup} update={callback}>
            {this._items.map((item: IShapeGroup) => (
                item.draw(true, callback)
            ))}
        </G>
    }

    /**
     * call update on all shapes or groups in this group
     * @param translation: the amount the shapes and or groups need to be moved
     */
    updatePosition(translation: Vector2): void {
        this._bbox.updatePosition(translation);
        this._items.forEach((item: IShapeGroup) => {
            item.updatePosition(translation);
        })
    }

    /**
     * apply scaling to this groups bounding box and pass it on the children
     * @param scale: x, y scaling factor
     * @param bbox: bounding box of the parent group (contains all positional data)
     */
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

    /**
     * update this groups positional data
     * @param bbox: bounding box (contains all positional data)
     */
    updateBBox(bbox: BBox) {
        this._bbox = bbox;
    }

    /**
     * move the selected shapes into this group
     * @param uuids: ID's
     */
    add(uuids: any[]) {
        uuids.forEach((uuid) => {
            this._items.push(this._itemInstance.remove(uuid)[0]);
        });
    }

    /**
     * remove this group and all children
     */
    remove(): void {
        this._itemInstance.add(this._items);
        this._itemInstance.remove(this._uuid);
    }

    /**
     * visitor pattern, used for saving all data
     * @param v: visitor
     */
    acceptVisitor(v: IVisitor): void {
        v.visitGroup(this);
    }

    /**
     * returns the data from this shape
     */
    getObjectData(): any {
        return {
            id: this._uuid,
            items: this._items,
            bbox: this._bbox
        }
    }
}

export {Group}