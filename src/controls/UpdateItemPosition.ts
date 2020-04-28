import {Shapes} from "../shapes/Shapes";
import {ICommand} from "./ICommand";
import {IShapeGroup} from "../shapes/IShapeGroup";

class UpdateItemPosition implements ICommand {
    private shapes = Shapes.getInstance();
    private shape: IShapeGroup;
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
        // update position to current position
        this.shape.updatePosition(this.newPosX, this.newPosY);
        return true;
    }

    undo = (): void => {
        // update position to previous position
        this.shape.updatePosition(this.oldPosX, this.oldPosY);
    }
}

export {UpdateItemPosition}