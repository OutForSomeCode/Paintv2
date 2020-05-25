import {Decorator} from "./Decorator";
import {BBox} from "../utility/BBox";
import {SharedShapeData} from "../shapes/SharedShapeData";

class DecoratorChangeColor extends Decorator {

    draw(index: number, bbox: BBox, style: any, inGroup: boolean, callback: () => void): any {
        const newStyle = SharedShapeData.styling;
        return super.draw(index, bbox, newStyle, inGroup, callback);
    }
}

export {DecoratorChangeColor}