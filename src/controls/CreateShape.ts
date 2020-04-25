import {Shape} from "../shapes/Shape";
import {Shapes} from "../shapes/Shapes";
import {ICommand} from "./ICommand";

class CreateShape implements ICommand {
    private shapes = Shapes.getShapes();
    private shape: Shape;

    constructor(shape: Shape) {
        this.shape = shape;
    }

    execute(): boolean {
        this.shapes.add(this.shape);
        return true;
    }

    undo(): void {
        this.shapes.remove(this.shape.uuid);
    }
}

export {CreateShape}