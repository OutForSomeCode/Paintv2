import React from "react";
import {Button} from "@material-ui/core";
import RedoIcon from '@material-ui/icons/Redo';
import UndoIcon from '@material-ui/icons/Undo';
import {Commands} from "./Commands";
import Grid from "@material-ui/core/Grid";

export default function History({shapeUpdate}: {shapeUpdate: any}) {
    //{shapeUpdate}: {shapeUpdate: any}
    const _commands = Commands.getCommands();

    function updateCanvas() {
        shapeUpdate()
    }

    function undoButton() {
        _commands.undo();
        updateCanvas();
    }

    function redoButton() {
        _commands.redo();
        updateCanvas();
    }

    return (
        <Grid item>
            <Button size={"large"} variant={"outlined"} startIcon={<UndoIcon/>} onClick={undoButton}>
                Undo
            </Button>
            <Button size={"large"} variant={"outlined"} startIcon={<RedoIcon/>} onClick={redoButton}>
                Redo
            </Button>
        </Grid>
    );
}