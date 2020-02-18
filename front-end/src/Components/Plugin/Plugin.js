// eslint-disable-file no-unused-vars
import React, {useState} from 'react';
import Rating from '@material-ui/lab/Rating';
import "./Plugin.css";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Chip from "@material-ui/core/Chip";
import "../fonts.css";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import Badge from "@material-ui/core/Badge";
import {Tooltip} from "@material-ui/core";

const PluginModel = require("../../model/plugin-model");

function Plugin(properties) {
    const plugin = properties.plugin;
    let tags = plugin.tags;
    const ratings = plugin.ratings;
    const comments = plugin.comments.map(comment => {
        return <p>{comment}</p>
    })
    const comments_count = plugin.comments.length;
    const comments_icon_tooltip = "Voir les commentaires" ;
    let score;
    if(comments_count >0){
        console.log(plugin)
    }
    const [show, setShow] = useState(false);
    const date = formatDate(plugin.updated_on);
    if (ratings.length > 0) {
        let sum = ratings.reduce((previous, current) => current += previous);
        score = sum / ratings.length;
    }
    tags = tags.map(tag => {
        return <Chip className={"tag"} size={"medium"} variant={"outlined"}
                     label={tag}
                     color="secondary"
        />
    });

    function formatDate(date) {
        date = new Date(date.toString());
        return ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
    }

    function commentsSectionChange() {
        setShow(!show);
    }


    return (

        <Card raised={"true"} className={"card"}>
            <CardContent>
                <div className={"plugin"}>
                    <div className={"top"}>
                        <Avatar>OP</Avatar>
                        <h1>{plugin.name}</h1>
                        <div className={"version_date"}>
                            <p className={"version"}>v{plugin.version}</p>
                            <p className={"date"}>{date}</p>
                        </div>

                    </div>
                    <div className={"image"}>
                        <img
                            src={"https://www.moddevices.com/hubfs/assets/images/images/gear-gallery/Leslie-600x450.png"}/>
                    </div>
                    <div className={"bottom"}>
                        <div className={"tags"}>
                            <Chip size={"medium"} color={"secondary"} className={"tag"}
                                  label={plugin.category.toUpperCase()}
                            />
                            <Chip size={"medium"} variant={"outlined"} className={"tag"}
                                  label={plugin.opensource ? "OSS" : "CSS"}
                                  color={"secondary"}
                            />
                            {tags}
                            <Chip size={"medium"} variant={"outlined"} className={"tag"} label={plugin.category}
                                  color={"secondary"}
                            />
                            <Chip size={"medium"} variant={"outlined"} className={"tag"} label={plugin.category}
                                  color={"secondary"}
                            />
                            <Chip size={"medium"} variant={"outlined"} className={"tag"} label={plugin.category}
                                  color={"secondary"}
                            />
                            <Chip size={"medium"} variant={"outlined"} className={"tag"} label={plugin.category}
                                  color={"secondary"}
                            />
                        </div>
                        <div className={"rating_comment"}>
                            <Box component="fieldset" mb={3} borderColor="transparent">
                                <Rating name="read-only" value={score} readOnly precision={0.5}/>
                            </Box>
                            <Tooltip title={<span id={"tooltip"}>{comments_icon_tooltip}</span>}>
                                <div id={"comments_logo_wrapper"}
                                     className={comments_count > 0 ?  "comments_logo_wrapper" : "comments_logo_wrapper_hidden" }
                                     onClick={() => commentsSectionChange()}>
                                    <Badge badgeContent={comments_count} color="secondary">
                                        <ModeCommentIcon fontSize={"large"}/>
                                    </Badge>
                                </div>
                            </Tooltip>


                        </div>
                    </div>
                    <div id={show ? "comments_showed" : "comments_toggled"} className={"comments_section"}>
                        {comments}
                    </div>
                </div>
            </CardContent>

        </Card>

    )
}

export default Plugin
