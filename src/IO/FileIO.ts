import YAML from 'yaml'
import { Items } from "../shapes/Items";
import { Circle } from "../shapes/Circle";
import { Square } from "../shapes/Square";
import { Rectangle } from "../shapes/Ractangle";
import { Triangle } from "../shapes/Triangle";
import { Shape } from "../shapes/Shape";
import { CSSProperties } from "react";
// @ts-ignore
import *  as scanf from 'sscanf'
import { SaveVisitor } from "../visitor/SaveVisitor";
import { IShapeGroup } from "../shapes/IShapeGroup";
import { Group } from "../shapes/Group";
import { Elliptic } from "../shapes/Elliptic";


let styling: CSSProperties = {
    stroke: "black",
    fill: "#cccccc"
}
/**
 * Handels file IO
 */
class FileIO {
    // https://eemeli.org/yaml/#working-with-anchors
    private static _instance: FileIO;

    private constructor() {
    }

    public static getInstance(): FileIO {
        if (!FileIO._instance) {
            FileIO._instance = new FileIO();
        }
        return FileIO._instance;
    }

    /**
     * Load data from localStorage
     */
    public Load() {
        const src = localStorage.getItem('Draw');
        if (src == null) return;
        const doc = YAML.parse(src)

        Items.getInstance().itemArray.length = 0;

        for (const a of doc) {
            if (a.Group)
                Items.getInstance().itemArray.push(this.CreateGroup(a))
            else
                Items.getInstance().itemArray.push(this.CreateShape(a))
        }
    }

    /**
     * Create group from data
     * @param group inputdata from localstorage
     */
    private CreateGroup(group: any) {
        const list: IShapeGroup[] = [];
        for (const a of group.Group) {
            if (a.Group)
                list.push(this.CreateGroup(a))
            else
                list.push(this.CreateShape(a))
        }

        let uuids = [];
        for (const a of list) {
            Items.getInstance().itemArray.push(a)
            uuids.push(a.getObjectData().id)
        }
        let kaas = new Group(uuids)
        console.log(uuids)
        return kaas
    }

    /**
     * Create shape from data
     * @param shape inputdata from localstorage
     */
    private CreateShape(shape: any) {
        console.log(shape)
        let parsedData;
        let type: any;
        if (shape.Circle) {
            type = new Circle()
            parsedData = scanf(shape.Circle, "%f, %f, %f, %f");
        } else if (shape.Elliptic) {
            type = new Elliptic()
            parsedData = scanf(shape.Elliptic, "%f, %f, %f, %f")
        } else if (shape.Square) {
            type = new Square()
            parsedData = scanf(shape.Square, "%f, %f, %f, %f");
        } else if (shape.Rectangle) {
            type = new Rectangle()
            parsedData = scanf(shape.Rectangle, "%f, %f, %f, %f");
        } else if (shape.Triangle) {
            type = new Triangle()
            parsedData = scanf(shape.Triangle, "%f, %f, %f, %f");
        } else {
            throw new Error(`Unknown type: ${shape}`)
        }

        return new Shape(type, parsedData[0], parsedData[1], parsedData[2], parsedData[3], styling)
    }

    /**
     * Save to localstorage
     */
    public Save() {
        const doc = new YAML.Document();
        const save = new SaveVisitor();

        Items.getInstance().itemArray.forEach(
            (item) => {
                item.acceptVisitor(save);
            }
        );

        console.log(save.buildTree())

        // @ts-ignore
        doc.contents = save.buildTree();

        console.log();
        localStorage.setItem('Draw', String(doc));
    }


}

export { FileIO }