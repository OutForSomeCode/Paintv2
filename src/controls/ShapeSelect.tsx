import React from 'react';

import CropSquareIcon from '@material-ui/icons/CropSquare';
import Crop169Icon from '@material-ui/icons/Crop169';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import ChangeHistoryRoundedIcon from '@material-ui/icons/ChangeHistoryRounded';

import Grid from '@material-ui/core/Grid';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import {Square} from "../shapes/Square";
import {Rectangle} from "../shapes/Rectangle";
import {Triangle} from "../shapes/Triangle";
import {Elliptic} from "../shapes/Elliptic";
import {SharedShapeData} from "../shapes/SharedShapeData";

export default function SelectShapeButtons() {
    const [shape, setShape] = React.useState<string | null>('circle');

    const changeShape = (event: React.MouseEvent<HTMLElement>, newShape: string | null) => {
        setShape(newShape);

        switch (newShape) {
            case "circle":
                SharedShapeData.type = new Elliptic();
                break;
            case "square":
                SharedShapeData.type = new Square();
                break;
            case "rectangle":
                SharedShapeData.type = new Rectangle();
                break;
            case "triangle":
                SharedShapeData.type = new Triangle();
                break;
            default:
                SharedShapeData.type = new Elliptic();
                break;
        }
    };

    return (
        <Grid item>
            <ToggleButtonGroup
                value={shape}
                exclusive
                onChange={changeShape}
                aria-label="text alignment"
            >
                <ToggleButton value="circle">
                    <RadioButtonUncheckedIcon/>
                </ToggleButton>
                <ToggleButton value="square">
                    <CropSquareIcon/>
                </ToggleButton>
                <ToggleButton value="rectangle">
                    <Crop169Icon/>
                </ToggleButton>
                <ToggleButton value="triangle">
                    <ChangeHistoryRoundedIcon/>
                </ToggleButton>
            </ToggleButtonGroup>
        </Grid>
    );
}
