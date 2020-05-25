import {BBox} from "../utility/BBox";

export interface IShape {
    /**
     * draw the given shape (returns html <element>)
     * @param index: ID
     * @param bbox: bounding box (contains all positional data)
     * @param style: style (border, shape color)
     * @param inGroup: bool to check if its in a group
     * @param callback: callback to the update function in index.tsx
     */
    draw(index: number, bbox: BBox, style: any, inGroup: boolean, callback: () => void): any;

    /**
     * returns this strategy as string
     */
    getType(): string;
}