import {IVisitor} from "./IVisitor";
import {Group} from "../shapes/Group";
import {Shape} from "../shapes/Shape";
import {Pair, YAMLSeq} from "yaml/types";
import {sprintf} from "sprintf-js";

class SaveVisitor implements IVisitor {
    private currentGroup = new YAMLSeq();

    visitGroup(g: Group): void {
        const dat = g.getObjectData()
        const myVisit = new SaveVisitor()
        dat.items.forEach(
            (e: Shape) => {
                e.acceptVisitor(myVisit)
            })
        this.currentGroup.items.push(new Pair("Group", myVisit.buildTree()))
    }

    visitShape(s: Shape): void {
        const shape = s.getObjectData();
        let kaas = new Pair(shape.strategy.getType(), sprintf(
            "%f, %f, %f, %f",
            shape.bbox.cx,
            shape.bbox.cy,
            shape.bbox.width,
            shape.bbox.height
        ))
        this.currentGroup.items.push(kaas);
    }

    buildTree() {
        return this.currentGroup;
    }
}

export {SaveVisitor}