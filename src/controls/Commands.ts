class Commands {
    private static _instance: Commands;
    private _commandArray: ICommand[] = [];
    private _undoneCommands: ICommand[] = [];

    private constructor() {
    }

    public static getCommands(): Commands{
        if(!Commands._instance){
            Commands._instance = new Commands();
        }
        return Commands._instance;
    }

    // for saving command history
    get commandArray(): ICommand[] {
        return this._commandArray;
    }

    // for loading command history
    set commandArray(value: ICommand[]) {
        this._commandArray = value;
    }

    public push(command: ICommand): void {
        if (command.execute()){
            this._commandArray.push(command);
        }
    }

    public undo(): void {
        let command = this._commandArray.pop();
        if (command != null){
            command.undo();
            this._undoneCommands.push(command);
        }
    }

    public redo(): void {
        this.push(this._undoneCommands.pop() as ICommand);
    }
}
export {Commands}
