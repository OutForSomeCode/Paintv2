import {Shapes} from "../shapes/Shapes";
import {Shape} from "../shapes/Shape";
import {ICommand} from "./ICommand";

class UpdateShapePosition implements ICommand {
    private shapes = Shapes.getShapes();
    private backupShape: Shape;
    private uuid: any;
    private posX: number;
    private posY: number;

    constructor(uuid: any, x: number, y: number) {
        this.uuid = uuid;
        this.posX = x;
        this.posY = y;
        this.backupShape = this.shapes.get(uuid); // creates a reference => deep copy needed
    }

    execute = (): boolean => {
        const shape: Shape = this.shapes.get(this.uuid);
        shape.updatePosition(this.posX, this.posY);
        this.shapes.update(shape);
        return true;
    }

    undo = (): void => {
        this.shapes.update(this.backupShape);
    }
}

export {UpdateShapePosition}