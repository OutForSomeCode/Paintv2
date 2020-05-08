import {Items} from "../shapes/Items";

const d3 = require("d3");

export default function Selection() {
    const itemsInstance = Items.getInstance();
    let selected: any[] = [];

    d3.selectAll(".selected").each(function () {
        // @ts-ignore
        const item = d3.select(this);
        selected.push(item.node().id);
    });
    itemsInstance.selectedItemsUuids = selected;
}