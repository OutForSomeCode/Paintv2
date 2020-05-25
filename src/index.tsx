import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {Items} from "./shapes/Items";
import History from "./controls/History";
import ShapeSelect from "./controls/ShapeSelect";
import ShapeSizeInput from "./controls/ShapeSizeInput";
import {ShapeStyleInput} from "./controls/ShapeStyleInput";
import IOMenu from "./controls/SaveLoad";
import {Canvas} from "./components/Canvas";
import {IShapeGroup} from "./shapes/IShapeGroup";
import ContextMenu from "./controls/ContextMenu";

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
    const itemsInstance = Items.getInstance();
    const classes = useStyles();
    const [shapeArray, setShapes] = React.useState({items: itemsInstance.itemArray});

    function update(): void {
        setShapes({items: itemsInstance.itemArray});
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
                        <ShapeStyleInput shapeUpdate={update}/>
                    </Paper>
                </Grid>
            </Grid>
            <Grid item xs>
                <Paper className={classes.test} elevation={2}>
                    <Canvas shapeUpdate={update}>
                        {shapeArray.items.map((item: IShapeGroup) => (
                            item.draw(false, update)
                        ))}
                    </Canvas>
                    <ContextMenu shapeUpdate={update}/>
                </Paper>
            </Grid>
        </Grid>
    )

}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);

