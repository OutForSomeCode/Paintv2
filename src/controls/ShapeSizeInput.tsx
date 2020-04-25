import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid";
import {SharedShapeData} from "../shapes/SharedShapeData";

export default function ShapeSizeInputs() {
    const [height, setHeight] = React.useState('50');
    const [width, setWidth] = React.useState('50');

    const changeHeight = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHeight(event.target.value);
        SharedShapeData.height = parseInt(event.target.value);
    };

    const changeWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWidth(event.target.value);
        SharedShapeData.width = parseInt(event.target.value);
    };

    return (
        <Grid item>
            <form noValidate autoComplete="off">
                <TextField
                    id="width-input"
                    type="number"
                    label="Width"
                    variant="outlined"
                    size="small"
                    value={width}
                    onChange={changeWidth}
                />
            </form>
            <form noValidate autoComplete="off">
                <TextField
                    id="height-input"
                    type="number"
                    label="Height"
                    variant="outlined"
                    size="small"
                    value={height}
                    onChange={changeHeight}
                />
            </form>
        </Grid>
    );
}
