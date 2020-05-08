import {ICommand} from "./ICommand";

class Commands {
    private static _instance: Commands;
    private _commandArray: ICommand[] = [];
    private _undoneCommands: ICommand[] = [];
    private _isRedo: boolean = false;

    private constructor() {
    }

    public static getInstance(): Commands {
        if (!Commands._instance) {
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

    public push = (command: ICommand): void => {
        if (command.execute()) {
            this._commandArray.push(command);
            if (!this._isRedo) {
                this._undoneCommands.length = 0;
                this._isRedo = false;
            }
        }
    }

    public undo = (): void => {
        let command = this._commandArray.pop() as ICommand;
        if (command != null) {
            command.undo();
            this._undoneCommands.push(command);
        }
    }

    public redo = (): void => {
        if (this._undoneCommands.length > 0) {
            this._isRedo = true;
            this.push(this._undoneCommands.pop() as ICommand);
        }
    }
}

export {Commands}
