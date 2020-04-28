import YAML, {AST} from 'yaml'
import {Shapes} from "../shapes/Shapes";
import {Pair, Scalar, YAMLMap, YAMLSeq} from "yaml/types";
import {Vector2} from "../utility/Vector2";
import {SharedShapeData} from "../shapes/SharedShapeData";
import {Circle} from "../shapes/Circle";
import {Square} from "../shapes/Square";
import {Rectangle} from "../shapes/Ractangle";
import {Triangle} from "../shapes/Triangle";
import {Shape} from "../shapes/Shape";
import {IShape} from "../shapes/IShape";
import {CSSProperties} from "react";
// @ts-ignore
import *  as scanf from 'sscanf'
import {sprintf} from "sprintf-js";

let format = "%f, %f, %f, %f";

let styling: CSSProperties = {
    stroke: "black",
    fill: "#cccccc"
}

class FileIO {
    // https://eemeli.org/yaml/#working-with-anchors

    static Load() {
        const src = localStorage.getItem('Draw');
        if (src == null) return;
        const doc = YAML.parseDocument(src)
        const {anchors, contents} = doc
        if (contents instanceof Scalar) return;

        let list: any[] = [];

        // @ts-ignore
        contents.items.forEach(
            (a: YAMLMap) => {
                var r = scanf(a.items[0].value.value, format);
                console.log(a.items[0].value)
                let i: any;

                switch (a.items[0].key.toString()) {
                    case "Circle":
                        i = new Circle()
                        break;
                    case "Square":
                        i = new Square()
                        break;
                    case "Rectangle":
                        i = new Rectangle()
                        break;
                    case "Triangle":
                        i = new Triangle()
                        break;
                    default:
                        throw new Error(`Unknown type: ${a.items[0].key}`)

                }
                list.push(new Shape(i, r[0], r[1], r[2], r[3], styling))
            });
        Shapes.getShapes().shapeArray = list;
    }

    static Save() {
        const doc = new YAML.Document()
        let root = new YAMLSeq();

        Shapes.getShapes().shapeArray.forEach(
            (a) => {
                let p = a.getPosition();
                let s = a.getsize();
                root.items.push(
                    new Pair(a.getType(), sprintf(format, p.x, p.y, s.x, s.y))
                )
            }
        );

        // @ts-ignore
        doc.contents = root;

        console.log();
        localStorage.setItem('Draw', String(doc));
    }
}

export {FileIO}