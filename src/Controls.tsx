import React from "react";
import {Circle} from "./shapes/Circle";

class Controls extends React.Component {
    static type: IShape = new Circle();

    render() {
        return (
            <div id="controls">
                <ToggleButtonGroup
                    value={alignment}
                    exclusive
                    onChange={handleAlignment}
                    aria-label="text alignment"
                >
                    <ToggleButton value="left" aria-label="left aligned">
                        <FormatAlignLeftIcon />
                    </ToggleButton>
                    <ToggleButton value="center" aria-label="centered">
                        <FormatAlignCenterIcon />
                    </ToggleButton>
                    <ToggleButton value="right" aria-label="right aligned">
                        <FormatAlignRightIcon />
                    </ToggleButton>
                    <ToggleButton value="justify" aria-label="justified" disabled>
                        <FormatAlignJustifyIcon />
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>
        );
    }
}
export {Controls}