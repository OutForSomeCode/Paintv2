import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import CropSquareIcon from '@material-ui/icons/CropSquare';
import Crop169Icon from '@material-ui/icons/Crop169';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import ChangeHistoryRoundedIcon from '@material-ui/icons/ChangeHistoryRounded';

import Grid from '@material-ui/core/Grid';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import {Controls} from "./Controls";
import {Circle} from "../shapes/Circle";
import {Square} from "../shapes/Square";
import {Rectangle} from "../shapes/Rectangle";
import {Triangle} from "../shapes/Triangle";

const useStyles = makeStyles((theme) => ({
    toggleContainer: {
        margin: theme.spacing(2, 0),
    },
}));

export default function ToggleButtons() {
    const [shape, setShape] = React.useState<string | null>('circle');

    const changeShape = (event: React.MouseEvent<HTMLElement>, newShape: string | null) => {
        setShape(newShape);

        switch (newShape) {
            case "circle":
                Controls.type = new Circle();
                break;
            case "square":
                Controls.type = new Square();
                break;
            case "rectangle":
                Controls.type = new Rectangle();
                break;
            case "triangle":
                Controls.type = new Triangle();
                break;
            default:
                Controls.type = new Circle();
                break;
        }
    };

    const classes = useStyles();

    return (
        <Grid container spacing={2}>
            <Grid item sm={6} md={3}>
                <div className={classes.toggleContainer}>
                    <ToggleButtonGroup
                        value={shape}
                        exclusive
                        onChange={changeShape}
                        aria-label="text alignment"
                    >
                        <ToggleButton value="circle" aria-label="left aligned">
                            <RadioButtonUncheckedIcon />
                        </ToggleButton>
                        <ToggleButton value="square" aria-label="centered">
                            <CropSquareIcon />
                        </ToggleButton>
                        <ToggleButton value="rectangle" aria-label="right aligned">
                            <Crop169Icon />
                        </ToggleButton>
                        <ToggleButton value="triangle" aria-label="justified">
                            <ChangeHistoryRoundedIcon />
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>
            </Grid>
        </Grid>
    );
}
