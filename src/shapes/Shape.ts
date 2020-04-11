class Shape {
    private strategy: IShape;
    private posX: number;
    private posY: number;
    private width: number;
    private height: number;
    private style: string[];

    constructor(strategy: IShape, x: number, y: number, w: number, h: number, s: string[]) {
        this.strategy = strategy;
        this.posX = x;
        this.posY = y;
        this.width = w;
        this.height = h;
        this.style = s;
    }

    public executeStrategy() {
        return this.strategy.Draw(this.posX, this.posY, this.width, this.height, this.style);
    }
}

export {Shape}

