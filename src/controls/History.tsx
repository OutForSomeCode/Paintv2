import React from "react";
import {Button, ButtonGroup} from "@material-ui/core";
import RedoIcon from '@material-ui/icons/Redo';
import UndoIcon from '@material-ui/icons/Undo';
import {Commands} from "./Commands";

class History extends React.Component<any, any> {
    private _commands = Commands.getCommands();

    updateCanvas() {

    }

    undoButton = () => {
        this._commands.undo();
        this.updateCanvas();
    }

    redoButton = () => {
        this._commands.redo();
        this.updateCanvas();
    }

    render() {
        return (
            <div>
                <ButtonGroup>
                    <Button startIcon={<UndoIcon/>} onClick={this.undoButton}>
                        Undo
                    </Button>
                    <Button startIcon={<RedoIcon/>} onClick={this.redoButton}>
                        Redo
                    </Button>
                </ButtonGroup>
            </div>
        );
    }
}

export {History}