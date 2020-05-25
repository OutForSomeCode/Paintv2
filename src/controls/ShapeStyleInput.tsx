import React from 'react';
import reactCSS from 'reactcss';
import {SketchPicker} from 'react-color';
import {Button, ButtonGroup} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {SharedShapeData} from "../shapes/SharedShapeData";
import Selection from "../functions/Selection";
import {Shape} from "../shapes/Shape";
import {DecoratorChangeColor} from "../Decorator/DecoratorChangeColor";
import {Items} from "../shapes/Items";

const d3 = require('d3');

class ShapeStyleInput extends React.Component<any, any> {
    private _itemsInstance = Items.getInstance();
    private _update = this.props.shapeUpdate;
    state = {
        background: '#cccccc',
        displayColorPicker: false,
    };

    handleChangeComplete = (color: any) => {
        this.setState({background: color.hex});
        SharedShapeData.styling = {
            fill: color.hex,
            stroke: "black"
        };
    };

    handleClick = () => {
        this.setState({displayColorPicker: !this.state.displayColorPicker})
    };

    handleClose = () => {
        this.setState({displayColorPicker: false})
        if (Selection() === 1) {
            const item = d3.select(".selected").node().id;
            const shape = this._itemsInstance.get(item) as Shape;
            shape.changeStrategy(new DecoratorChangeColor(shape.getObjectData().strategy));
            this._update();
        }
    };

    render() {
        const styles = ({
            popover: {
                position: 'absolute',
                zIndex: '2',
            },
            cover: {
                position: 'fixed',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
            },
            // @ts-ignore
        }) as reactCSS;

        return (
            <Grid item>
                <ButtonGroup>
                    <Button size="large" onClick={this.handleClick}>
                        Background color
                    </Button>
                </ButtonGroup>
                {this.state.displayColorPicker ? <div style={styles.popover}>
                    <div style={styles.cover} onClick={this.handleClose}/>
                    <SketchPicker
                        color={this.state.background}
                        onChangeComplete={this.handleChangeComplete}
                    />
                </div> : null}
            </Grid>
        );
    }
}

export {ShapeStyleInput}