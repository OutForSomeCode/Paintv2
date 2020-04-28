import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {Shapes} from "./shapes/Shapes";
import History from "./controls/History";
import ShapeSelect from "./controls/ShapeSelect";
import ShapeSizeInput from "./controls/ShapeSizeInput";
import {ShapeStyleInput} from "./controls/ShapeStyleInput";
import {Shape} from "./shapes/Shape";
import {CreateShape} from "./controls/CreateShape";
import {SharedShapeData} from "./shapes/SharedShapeData";
import {Commands} from "./controls/Commands";
import IOMenu from "./IO/Menu";
import {from} from "rxjs";
import {Canvas} from "./components/Canvas";
import {IShapeGroup} from "./shapes/IShapeGroup";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            padding: theme.spacing(2),
            height: '100%'
        },
        paper: {
            height: 50,
            width: 125,
        },
        control: {
            padding: theme.spacing(1),
            // background: "black",
            height: "100%",
        },
        button: {
            height: 50,
            width: 50,
            background: "white",
        },
        test: {
            height: "100%",
        }
    }),
);

function App() {
    const shapeInstance = Shapes.getInstance();
    const classes = useStyles();
    const [shapeArray, setShapes] = React.useState({shapes: shapeInstance.shapeArray});

    function update(): void {
        setShapes({shapes: shapeInstance.shapeArray});
    }

    return (
        <Grid className={classes.root} container spacing={1}>
            <Grid item>
                <Grid className={classes.test} container direction={"column"}>
                    <Paper className={classes.control} elevation={3}>
                        <IOMenu shapeUpdate={update}/>
                        <History shapeUpdate={update}/>
                        <ShapeSelect/>
                        <ShapeSizeInput/>
                        <ShapeStyleInput/>
                    </Paper>
                </Grid>
            </Grid>
            <Grid item xs>
                <Paper className={classes.test} elevation={2}>
                    <Canvas shapeUpdate={update}>
                        {shapeArray.shapes.map((item: IShapeGroup) => (
                            item.draw()
                        ))}
                    </Canvas>
                </Paper>
            </Grid>
        </Grid>
    )

}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);

