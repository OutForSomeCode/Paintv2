import {Shapes} from "../shapes/Shapes";
import {Shape} from "../shapes/Shape";
import {ICommand} from "./ICommand";
import {Vector2} from "../utility/Vector2";

class UpdateShapePosition implements ICommand {
    private shapes = Shapes.getInstance();
    private shape: Shape;
    private oldPos: Vector2;
    private newPos: Vector2;

    constructor(uuid: any, pos: Vector2) {
        this.shape = this.shapes.get(uuid);
        this.newPos = pos;
        this.oldPos = this.shape.getPosition();
    }

    execute = (): boolean => {
        // adds posX, posY values to current position
        this.shape.updatePosition(this.newPos);
        return true;
    }

    undo = (): void => {
        // subtracts posX, posY values from current position
        this.shape.updatePosition(this.oldPos);
    }
}

export {UpdateShapePosition}