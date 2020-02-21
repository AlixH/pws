// eslint-disable-file no-unused-vars
import React, {useRef, useState} from 'react';
import Rating from '@material-ui/lab/Rating';
import Popper from '@material-ui/core/Popper';
import "./Plugin.css";
import ReactPlayer from 'react-player'
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Chip from "@material-ui/core/Chip";
import "../fonts.css";
import Modal from 'react-modal';
import Box from "@material-ui/core/Box";
import ImageIcon from '@material-ui/icons/Image';
import YouTubeIcon from '@material-ui/icons/YouTube';
import Avatar from "@material-ui/core/Avatar";
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import Badge from "@material-ui/core/Badge";
import CodeIcon from '@material-ui/icons/Code';
import {Tooltip} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {OPEN_PLUGIN_DETAILS} from "../../store/actions/OpenPluginDetails";

function Plugin(properties) {
    const plugin = properties.plugin;
    let tags = plugin.tags.slice(0, 5);
    const dispatch = useDispatch();
    const open_source = plugin.opensource;
    const [anchorEl, setAnchorEl] = useState(null);
    const ratings = plugin.ratings;
    const comments_modifier = {
        flip: {
            enabled: true,
        },
        preventOverflow: {
            enabled: true,
                boundariesElement: 'scrollParent',
        },

    };

    const comments = plugin.comments.map(comment => {
        return <p>{comment}</p>
    })
    const comments_count = plugin.comments.length;
    const comments_icon_tooltip = "Voir les commentaires";
    let score;
    if (comments_count > 0) {
        console.log(plugin)
    }
    const [show, setShow] = useState(false);
    const [video, setVideo] = useState(false);
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
    function changeMedia() {
        setVideo(!video)
    }

    function comments_section(event) {
        setShow(!show);
        setAnchorEl(event.currentTarget)

    }

    function openModal() {
        console.log(properties)
        dispatch({
            type:OPEN_PLUGIN_DETAILS,
            plugin:properties.index
        })
    }

    return (

        <Card raised={true} className={"card"}>
            <CardContent>
                <div className={show ? "plugin-expanded" : "plugin-toggled"} id={"plugin"}>
                    <div className={"plugin-preview"}>
                        <div className={"top"}>
                            <Tooltip  title={<span id={"tooltip"}>Télécharger le code source</span>}>
                                <div className={open_source ? "button_hover fork-show" : "button_hover fork-hide"}>
                                    <Avatar>
                                        <CodeIcon fontSize={"large"}/>
                                    </Avatar>
                                </div>
                            </Tooltip>
                            <h1 id={"title"} onClick={() => openModal()} >{plugin.name}</h1>
                            <div className={"version_date"}>
                                <p className={"version"}>v{plugin.version}</p>
                                <p className={"date"}>{date}</p>
                            </div>

                        </div>
                        <div className={"media"}>
                            <div id={"media_choice"}>

                                <div title={"Image"} className={!video ? "media_toggled" : "media_show"}
                                     onClick={() => changeMedia()}>
                                    <ImageIcon className={"button_hover"} fontSize={"large"}/>
                                </div>
                                <div title={"Vidéo"} className={!video ? "media_show" : "media_toggled"}
                                     onClick={() => changeMedia()}>
                                    <YouTubeIcon className={"button_hover"} fontSize={"large"}/>
                                </div>
                            </div>
                            <div className={"the_media"}>
                                {!video ?
                                    <img className={"image"}
                                         src={"https://www.moddevices.com/hubfs/assets/images/images/gear-gallery/Leslie-600x450.png"}/>
                                    :
                                    <div className={"video"}>
                                        <ReactPlayer width={"100%"} height={"300px"} url={plugin.video_url} controls/>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className={"bottom"}>
                            <div className={"tags"}>
                                <Chip size={"medium"} color={"secondary"} className={"tag"}
                                      label={"Catégorie : " + plugin.category.toUpperCase()}
                                />
                                <Chip size={"medium"} variant={"outlined"} className={"tag"}
                                      label={open_source ? "Open-source" : "Closed-source"}
                                      color={"secondary"}
                                />
                                {tags}
                            </div>
                            <div className={"rating_comment"}>
                                <Box component="fieldset" mb={3} borderColor="transparent">
                                    <Rating size={"large"} name="read-only" value={score} readOnly precision={1}/>
                                </Box>
                                <Tooltip title={<span id={"tooltip"}>{comments_icon_tooltip}</span>}>
                                    <div onClick={comments_section}
                                         className={comments_count > 0 ? "button_hover comments_logo_wrapper" : "button_hover comments_logo_wrapper_hidden"}>
                                        <Badge badgeContent={comments_count} color="secondary">
                                            <ModeCommentIcon fontSize={"large"}/>
                                        </Badge>
                                    </div>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                    {show ?
                        <Popper  placement={"left-end"} open={show} modifiers={comments_modifier} anchorEl={anchorEl} transition>
                            <Card >
                                <div className={"comments_section"}>{comments}</div>
                            </Card>
                        </Popper>
                        : null
                    }
                </div>

            </CardContent>
        </Card>


    )
}

export default Plugin
