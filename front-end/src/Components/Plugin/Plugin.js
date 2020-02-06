// eslint-disable-file no-unused-vars
import React from 'react';
import "./Plugin.css";
const PluginModel = require("../../model/plugin-model");


function Plugin(properties){
    let plugin = new PluginModel(...properties.plugin);
    return (
        <div>
            <img src={plugin.imageUrl}/>
            <div id={"plugin_preview"}>
                <h1>{plugin.name}</h1>
                <h2>{plugin.category}</h2>
                <h2>{plugin.score}</h2>
                <h2>{plugin.tags}</h2>
            </div>

        </div>
    )
}

export default Plugin
