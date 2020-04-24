import React, {CSSProperties} from "react";
import ShapeSelect from "./ShapeSelect";
import ShapeSizeInput from "./ShapeSizeInput";
import {ShapeStyleInput} from "./ShapeStyleInput";
import Grid from "@material-ui/core/Grid";
import {Elliptic} from "../shapes/Elliptic";
import {IShape} from "../shapes/IShape";
import {History} from "./History";

class Controls extends React.Component {
    static selectMode: boolean = false;
    static type: IShape = new Elliptic();
    static height: number = 50;
    static width: number = 50;
    static styling: CSSProperties = {
        stroke: "black",
        fill: "#cccccc"
    }

    render() {
        return (
            <div>
                <History/>
                <Grid container spacing={2} direction="row" id="controls">
                    <Grid item sm={6} md={3}>
                        <ShapeSelect/>
                    </Grid>
                    <Grid item sm={8} md={4}>
                        <ShapeSizeInput/>
                    </Grid>
                    <Grid item sm={10} md={5}>
                        <ShapeStyleInput/>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export {Controls}