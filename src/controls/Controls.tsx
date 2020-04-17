import React from "react";
import {Circle} from "../shapes/Circle";
import ShapeSelect from "./ShapeSelect";
import ShapeSizeInput from "./ShapeSizeInput";
import {ShapeStyleInput} from "./ShapeStyleInput";
import Grid from "@material-ui/core/Grid";
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        sizeForm: {
            '& > *': {
                margin: theme.spacing(2, 0),
                width: '25ch',
            },
        },
        toggleContainer: {
            margin: theme.spacing(2, 0),
        },
    }),
);

class Controls extends React.Component {
    static selectMode: boolean = false;
    static type: IShape = new Circle();
    static height: number = 50;
    static width: number = 50;
    static hexColor: string = "#cccccc";

    static getStyles() {
        return useStyles();
    }

    render() {
        return (
            <Grid container spacing={2} id="controls">
                <Grid item sm={6} md={3}>
                    <ShapeSelect/>
                </Grid>
                <Grid item sm={12} md={6}>
                    <ShapeSizeInput/>
                </Grid>
                <Grid item sm={6} md={3}>
                    <ShapeStyleInput/>
                </Grid>
            </Grid>
        );
    }
}

export {Controls}