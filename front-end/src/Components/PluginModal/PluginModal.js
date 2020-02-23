import React from "react";
import './PluginModal.css';
import {InputLabel, Modal} from "@material-ui/core";
import Plugin from "../Plugin/Plugin";
import {OPEN_PLUGIN_DETAILS} from "../../store/actions/OpenPluginDetails";
import {useDispatch, useSelector} from "react-redux";
import shallowEqual from "react-redux/lib/utils/shallowEqual";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import {Rating} from "@material-ui/lab";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";


function PluginModal() {

    const dispatch = useDispatch();
    const openPlugin = useSelector(state => state.openPluginReducer.plugin, shallowEqual);
    const pluginsList = useSelector(state => state.pluginListReducer.pluginsList, shallowEqual);
    const isLoggedIn = useSelector(state => state.loginSuccessReducer.isLoginSuccess, shallowEqual);
    const plugin = pluginsList[openPlugin];



    function closeModal() {
        dispatch({
            type: OPEN_PLUGIN_DETAILS,
            plugin: null
        })
    }

    async function rate(rating) {
        let url = "http://localhost:4000/plugins/rate";
        const response = await fetch(url, {
            method: 'post',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pluginId: plugin._id,
                note: rating
            })
        });
    }

    async function handleKeyPress(e) {
        const input = e.target.value;
        if (e.key === 'Enter' && input.trim() !== '') {
            let url = "http://localhost:4000/plugins/comment";
            const response = await fetch(url, {
                method: 'post',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    pluginId: plugin._id,
                    commentText: e.target.value
                })
            });
        }
    }

    return plugin != null ? (

        <Modal
            onClose={() => closeModal()}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={openPlugin != null}
        >
            <div id={"modal"}>
                <Plugin plugin={plugin}/>
                <div className={"card"}>
                    <Card raised={true}>
                        <CardContent>
                            <div id={"description"}>
                                <h1 className={"card_title"}>Description</h1>
                                {plugin.description}
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className={"card"}>
                    <Card raised={true}>
                        <CardContent>
                            <div id={"test"}>
                                <h1 className={"card_title"}>Test</h1>
                                <h2>TODO !!</h2>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                {isLoggedIn ?
                    <div className={"card"}>
                        <Card raised={true}>
                            <CardContent>
                                <div id={"user_feedback"}>
                                    <div id={"test"}>
                                        <h1 className={"card_title"}>Exprimez votre avis</h1>
                                    </div>
                                    <div id={"comment_input"}>
                                        <TextField className={"textField"} margin={"normal"}
                                                   id="outlined-required"
                                                   name="tags"
                                                   multiline={true}
                                                   rowsMax={2}
                                                   label="Commentaire"
                                                   variant="outlined"
                                                   onKeyPress={(e) => handleKeyPress(e)}
                                        />
                                    </div>
                                    <div id={"rating_input"}>
                                        <InputLabel>Note</InputLabel>
                                        <Select variant={"outlined"} id={"select"}
                                                onChange={(e) => rate(e.target.value)}>
                                            <MenuItem value={"0"}>0</MenuItem>
                                            <MenuItem value={"1"}>1</MenuItem>
                                            <MenuItem value={"2"}>2</MenuItem>
                                            <MenuItem value={"3"}>3</MenuItem>
                                            <MenuItem value={"4"}>4</MenuItem>
                                            <MenuItem value={"5"}>5</MenuItem>
                                        </Select>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    : null
                }
            </div>
        </Modal>

    ) : null
}

export default PluginModal;