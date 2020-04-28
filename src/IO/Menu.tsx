import React from "react";
import {FileIO} from "./FileIO";
import {Button} from "@material-ui/core";
import FileCopyIcon from '@material-ui/icons/FileCopy';
import SaveIcon from '@material-ui/icons/Save';

export default function IOMenu({shapeUpdate}: {shapeUpdate: any}) {

    function updateCanvas() {
        shapeUpdate();
    }

    function save() {
        FileIO.Save();
        updateCanvas();
    }

    function load() {
        FileIO.Load();
        updateCanvas();
    }

    return (
        <div>
            <Button size={"large"} variant={"outlined"} startIcon={<SaveIcon/>} onClick={save}>
                Save
            </Button>
            <Button size={"large"} variant={"outlined"} startIcon={<FileCopyIcon/>} onClick={load}>
                Load
            </Button>
        </div>
    );
}