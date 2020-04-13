import React from 'react';
import { MaterialPicker } from 'react-color';
import {Controls} from "./Controls";

class ShapeStyleInput extends React.Component {
    state = {
        background: '#cccccc',
    };

    handleChangeComplete = (color: any) => {
        this.setState({ background: color.hex });
        Controls.hexColor = color.hex;
    };

    render() {
        return (
            <MaterialPicker
                color={ this.state.background }
                onChangeComplete={ this.handleChangeComplete }
            />
        );
    }
}
export {ShapeStyleInput}