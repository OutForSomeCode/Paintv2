import React from 'react';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import PostAddIcon from '@material-ui/icons/PostAdd';
import BackspaceIcon from '@material-ui/icons/Backspace';
import DeleteIcon from '@material-ui/icons/Delete';
import {Items} from "../shapes/Items";
import {Group} from "../shapes/Group";

const d3 = require("d3");

export default function ContextMenu({shapeUpdate}: { shapeUpdate: any }) {
    const itemInstance = Items.getInstance();

    function createGroup() {
        itemInstance.add(new Group(itemInstance.selectedItemsUuids));
        hideContextMenu();
    }

    function removeGroup() {
        itemInstance.selectedItemsUuids.forEach((uuid) => {
            //todo type check needed (typeof not working)
            const i = itemInstance.get(uuid) as Group;
            i.remove();
        });
        hideContextMenu();
    }

    function hideContextMenu() {
        d3.select("#contextMenu").style('display', 'none');
        shapeUpdate();
    }

    return (
        <Paper id="contextMenu">
            <MenuList>
                <MenuItem onClick={createGroup}>
                    <ListItemIcon>
                        <PostAddIcon fontSize="small"/>
                    </ListItemIcon>
                    <Typography variant="inherit">Create group</Typography>
                </MenuItem>
                <MenuItem onClick={removeGroup}>
                    <ListItemIcon>
                        <BackspaceIcon fontSize="small"/>
                    </ListItemIcon>
                    <Typography variant="inherit">Remove group</Typography>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <DeleteIcon fontSize="small"/>
                    </ListItemIcon>
                    <Typography variant="inherit">Delete</Typography>
                </MenuItem>
            </MenuList>
        </Paper>
    );
}
