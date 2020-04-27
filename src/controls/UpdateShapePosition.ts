import {Shapes} from "../shapes/Shapes";
import {Shape} from "../shapes/Shape";
import {ICommand} from "./ICommand";

class UpdateShapePosition implements ICommand {
    private shapes = Shapes.getShapes();
    private shape: Shape;
    private oldPosX: number;
    private oldPosY: number;
    private newPosX: number;
    private newPosY: number;

    constructor(uuid: any, x: number, y: number) {
        this.shape = this.shapes.get(uuid);
        this.newPosX = x;
        this.newPosY = y;
        let oldPosition = this.shape.getPosition();
        this.oldPosX = oldPosition[0];
        this.oldPosY = oldPosition[1];
    }

    execute = (): boolean => {
        // adds posX, posY values to current position
        this.shape.updatePosition(this.newPosX, this.newPosY);
        return true;
    }

    undo = (): void => {
        // subtracts posX, posY values from current position
        this.shape.updatePosition(this.oldPosX, this.oldPosY);
    }
}

export {UpdateShapePosition}