import React from 'react';
import TextField from '@material-ui/core/TextField';
import {Controls} from "./Controls";

export default function ShapeSizeInputs() {
    const [height, setHeight] = React.useState('50');
    const [width, setWidth] = React.useState('50');

    const changeHeight = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHeight(event.target.value);
        Controls.height = parseInt(event.target.value);
    };

    const changeWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWidth(event.target.value);
        Controls.width = parseInt(event.target.value);
    };

    return (
        <form noValidate autoComplete="off">
            <TextField
                id="width-input"
                type="number"
                label="Width"
                variant="outlined"
                color="secondary"
                value={width}
                onChange={changeWidth}
            />
            <TextField
                id="height-input"
                type="number"
                label="Height"
                variant="outlined"
                color="secondary"

                value={height}
                onChange={changeHeight}
            />
        </form>
    );
}
