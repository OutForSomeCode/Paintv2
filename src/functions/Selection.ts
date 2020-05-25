import {Items} from "../shapes/Items";

const d3 = require("d3");

/**
 * get the selected items from the canvas and update the selected list in Items._itemsInstance
 * @constructor
 */
export default function Selection() {
    const itemsInstance = Items.getInstance();
    let selected: any[] = [];
    let count = 0;

    d3.selectAll(".selected").each(function () {
        // @ts-ignore
        const item = d3.select(this);
        selected.push(item.node().id);
        count++;
    });
    itemsInstance.selectedItemsUuids = selected;

    return count;
}