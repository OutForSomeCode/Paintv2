import YAML from 'yaml'
import {Shapes} from "../shapes/Shapes";
import {Scalar, YAMLMap, YAMLSeq} from "yaml/types";
import {Circle} from "../shapes/Circle";
import {Square} from "../shapes/Square";
import {Rectangle} from "../shapes/Ractangle";
import {Triangle} from "../shapes/Triangle";
import {Shape} from "../shapes/Shape";
import {CSSProperties} from "react";
// @ts-ignore
import *  as scanf from 'sscanf'
import {SaveVisitor} from "../visitor/SaveVisitor";

let format = "%f, %f, %f, %f";

let styling: CSSProperties = {
    stroke: "black",
    fill: "#cccccc"
}

class FileIO {
    // https://eemeli.org/yaml/#working-with-anchors
    private static _instance: FileIO;
    private _root = new YAMLSeq();

    private constructor() {
    }

    public static getInstance() :FileIO {
        if(!FileIO._instance){
            FileIO._instance = new FileIO();
        }
        return FileIO._instance;
    }

    public getRoot(): any{
        return this._root;
    }

    public Load() {
        const src = localStorage.getItem('Draw');
        if (src == null) return;
        const doc = YAML.parseDocument(src)
        const {contents} = doc
        if (contents instanceof Scalar) return;

        let list: any[] = [];

        // @ts-ignore
        contents.items.forEach(
            (a: YAMLMap) => {
                const parsedData = scanf(a.items[0].value.value, format);
                console.log(a.items[0].value)
                let type: any;

                switch (a.items[0].key.toString()) {
                    case "Circle":
                        type = new Circle()
                        break;
                    case "Square":
                        type = new Square()
                        break;
                    case "Rectangle":
                        type = new Rectangle()
                        break;
                    case "Triangle":
                        type = new Triangle()
                        break;
                    default:
                        throw new Error(`Unknown type: ${a.items[0].key}`)

                }
                list.push(new Shape(type, parsedData[0], parsedData[1], parsedData[2], parsedData[3], styling))
            });
        Shapes.getInstance().shapeArray = list;
    }

    public Save() {
        const doc = new YAML.Document();
        const saveData = new SaveVisitor();
        this._root = new YAMLSeq();

        Shapes.getInstance().shapeArray.forEach(
            (a) => {
                a.acceptVisitor(saveData);
            }
        );

        // @ts-ignore
        doc.contents = this._root;

        console.log();
        localStorage.setItem('Draw', String(doc));
    }
}

export {FileIO}