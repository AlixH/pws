// eslint-disable-file no-unused-vars
import React from 'react';
import "./NavBar.css";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";

const PluginModel = require("../../model/plugin-model");


function NavBar(properties) {
    // let plugin = new PluginModel(...properties.plugin);
    return (
        <div >
            <AppBar className={"nav-bar"} style={{backgroundColor : "#69585F"}}   position="fixed">
                <Tabs
                    variant="fullWidth"
                    aria-label="nav tabs example"
                >
                </Tabs>
            </AppBar>
        </div>

    )
}

export default NavBar
