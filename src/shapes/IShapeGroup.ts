export interface IShapeGroup {
    draw(): any;
    updatePosition(x: number, y: number): void;
    getPosition(): number[];
    getUuid(): any;
}