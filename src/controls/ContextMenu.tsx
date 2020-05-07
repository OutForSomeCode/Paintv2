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
import {Commands} from "../Commands/Commands";
import {CommandCreateGroup} from "../Commands/CommandCreateGroup";
import reactCSS from "reactcss";
import {CommandDeleteSelected} from "../Commands/CommandDeleteSelected";

const d3 = require("d3");

export default function ContextMenu({shapeUpdate}: { shapeUpdate: any }) {
    const itemInstance = Items.getInstance();
    const commands = Commands.getInstance();
    const styles = ({
        menu: {
            width: '250px',
        },
        // @ts-ignore
    }) as reactCSS;

    function createGroup() {
        commands.push(new CommandCreateGroup(itemInstance.selectedItemsUuids));
        hideContextMenu();
    }

    function removeGroup() {
        itemInstance.selectedItemsUuids.forEach((uuid) => {
            if (d3.select(`[id="${uuid}"]`).node().tagName === "g") {
                const i = itemInstance.get(uuid) as Group;
                i.remove();
            }
        });
        hideContextMenu();
    }

    function deleteSelected() {
        commands.push(new CommandDeleteSelected(itemInstance.selectedItemsUuids));
        hideContextMenu();
    }

    function hideContextMenu() {
        d3.select("#contextMenu").style('display', 'none');
        shapeUpdate();
    }

    return (
        <Paper id="contextMenu" style={styles.menu}>
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
                    <Typography variant="inherit">Remove group(s)</Typography>
                </MenuItem>
                <MenuItem onClick={deleteSelected}>
                    <ListItemIcon>
                        <DeleteIcon fontSize="small"/>
                    </ListItemIcon>
                    <Typography variant="inherit">Delete</Typography>
                </MenuItem>
            </MenuList>
        </Paper>
    );
}
