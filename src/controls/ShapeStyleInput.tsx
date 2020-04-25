import React from 'react';
import reactCSS from 'reactcss';
import {SketchPicker} from 'react-color';
import {Button, ButtonGroup} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {SharedShapeData} from "../shapes/SharedShapeData";

class ShapeStyleInput extends React.Component {
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