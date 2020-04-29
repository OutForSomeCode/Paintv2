import {Shape} from "../shapes/Shape";
import {Group} from "../shapes/Group";

export interface IVisitor {
    visitShape(s: Shape): void;
    visitGroup(g: Group): void;
}