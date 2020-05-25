import {BBox} from "../utility/BBox";

export interface IShape {
    getType(): string;
    draw(index: number, bbox: BBox, style: any, inGroup: boolean, callback: () => void): any;
}