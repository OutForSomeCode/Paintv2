import {IVisitor} from "./IVisitor";
import {Group} from "../shapes/Group";
import {Shape} from "../shapes/Shape";
import {FileIO} from "../IO/FileIO";
import {Pair} from "yaml/types";
import {sprintf} from "sprintf-js";

class SaveVisitor implements IVisitor{
    private fileIO = FileIO.getInstance();
    visitGroup(g: Group): void {

    }

    visitShape(s: Shape): void {
        const shape = s.getObjectData();
        this.fileIO.getRoot().items.push(
            new Pair(shape.strategy, sprintf(
                "%f, %f, %f, %f",
                shape.pos.x,
                shape.pos.y,
                shape.size.x,
                shape.size.y
            ))
        );
    }
}

export {SaveVisitor}