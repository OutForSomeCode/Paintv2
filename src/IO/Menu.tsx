import React from "react";
import {FileIO} from "./FileIO";

export default function IOMenu() {
    return (
        <div>
            <button onClick={() => FileIO.Save()}>
                Save
            </button>
            <button>
                Load
            </button>
        </div>
    );
}