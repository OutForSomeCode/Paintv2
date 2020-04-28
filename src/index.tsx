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
    const svgCanvas = React.createRef<SVGSVGElement>();
    const shapeInstance = Shapes.getInstance();
    const commandInstance = Commands.getInstance();
    const classes = useStyles();
    const [shapeArray, setShapes] = React.useState({shapes: shapeInstance.shapeArray});

    function update(): void {
        setShapes({shapes: shapeInstance.shapeArray});
    }

    function addShape(event: { clientX: number; clientY: number; }): any {
        let offset = svgCanvas.current!.getBoundingClientRect();
        commandInstance.push(
            new CreateShape(
                new Shape(
                    SharedShapeData.type,
                    event.clientX - offset.left,
                    event.clientY - offset.top,
                    SharedShapeData.width,
                    SharedShapeData.height,
                    SharedShapeData.styling
                )
            )
        );
        update();
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
                    <svg className="fullSize" ref={svgCanvas} onClick={addShape}>
                        {shapeArray.shapes.map((shape: Shape) => (
                            shape.draw()
                        ))}
                    </svg>
                </Paper>
            </Grid>
        </Grid>
    )

}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);

