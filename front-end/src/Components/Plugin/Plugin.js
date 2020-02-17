// eslint-disable-file no-unused-vars
import React from 'react';
import "./Plugin.css";
import Button from '@material-ui/core/Button';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
const PluginModel = require("../../model/plugin-model");


function Plugin(properties){
    const plugin = properties.plugin;
    let tags = plugin.tags.map(tag => {
        return <Chip className={"tag"} size={"medium"}
            label={tag}
            color="secondary"
        />
    });

    return (
        <Card raised={"true"} className={"card"} >
            <CardContent >
                <div className={"plugin"}>
                    <h1>{plugin.name}</h1>
                    <img src={"https://www.moddevices.com/hubfs/assets/images/images/gear-gallery/Leslie-600x450.png"} />
                    <div className={"plugin_preview"}>
                        <h2>{plugin.score}</h2>
                        <Button variant={"contained"}>Détails</Button>
                        <div className={"tags"}>
                            {tags}
                        </div>
                    </div>
                </div>
            </CardContent>

        </Card>

    )
}

export default Plugin
