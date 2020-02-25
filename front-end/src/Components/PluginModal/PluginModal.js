import React, {useRef, useState} from "react";
import './PluginModal.css';
import {InputLabel, Modal} from "@material-ui/core";
import Plugin from "../Plugin/Plugin";
import {OPEN_PLUGIN_DETAILS} from "../../store/actions/OpenPluginDetails";
import {useDispatch, useSelector} from "react-redux";
import shallowEqual from "react-redux/lib/utils/shallowEqual";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import SendIcon from '@material-ui/icons/Send';
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Typography from "@material-ui/core/Typography";


function PluginModal() {

    const dispatch = useDispatch();
    const openPlugin = useSelector(state => state.openPluginReducer.plugin, shallowEqual);
    const pluginsList = useSelector(state => state.pluginListReducer.pluginsList, shallowEqual);
    const isLoggedIn = useSelector(state => state.loginSuccessReducer.isLoginSuccess, shallowEqual);
    const [openCommentSent, setOpenCommentSent] = useState(false);
    const [openRatingSent, setOpenRatingSet] = useState(false);
    const plugin = pluginsList[openPlugin];
    const [rating, setRating] = useState(null);
    const rating_ref = useRef(null);
    const[interupteur,setInterupteur] = useState(false);


    function closeModal() {
        dispatch({
            type: OPEN_PLUGIN_DETAILS,
            plugin: null
        })
    }

    async function rate(rating) {
        let url = "http://localhost:4000/plugins/rate";
        if (rating !== null && rating !== "") {
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
            setOpenRatingSet(true);
            setInterupteur(!interupteur);
        }
    }

    async function handleKeyPress(e) {
        const input = e.target.value;
        if (e.key === 'Enter') {
            e.target.value = "";
            await sendMessage(input);

        }
    }

    async function sendMessage(input) {
        if (input !== null && input.trim() !== "") {
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
                    commentText: input
                })
            });
            setOpenCommentSent(true);
        }
    }


    function handleCloseSnack(event, reason) {
        if (reason === 'clickaway') {
            return
        }
        setOpenCommentSent(false);
        setOpenRatingSet(false);

    }

    return plugin != null ? (

        <Modal
            onClose={() => closeModal()}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={openPlugin != null}
        >
            <div id={"modal"}>
                <Plugin key={interupteur} refresh={interupteur}  plugin={plugin}/>
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
                {isLoggedIn ?
                    <div className={"card"}>
                        <Card raised={true}>
                            <CardContent>
                                <div id={"user_feedback"}>
                                    <div id={"test"}>
                                        <h1 className={"card_title"}>Exprimez votre avis</h1>
                                    </div>
                                    <div id={"comment_input"}>
                                        <Typography style={{marginTop: "2%"}}>Ecrivez, et appuyez sur "Entrée" pour
                                            envoyer votre commentaire!</Typography>

                                        <TextField className={"textField"} margin={"normal"}
                                                   id="outlined-required"
                                                   name="tags"
                                                   multiline={true}
                                                   rowsMax={10}
                                                   rows={10}
                                                   label="Commentaire"
                                                   variant="outlined"
                                                   onKeyPress={(e) => handleKeyPress(e)}
                                        />
                                        <Snackbar anchorOrigin={{horizontal: "right", vertical: "top"}}
                                                  open={openCommentSent} autoHideDuration={3000}
                                                  onClose={handleCloseSnack}>
                                            <Alert onClose={handleCloseSnack} severity="success">
                                                Commentaire envoyé
                                            </Alert>
                                        </Snackbar>
                                    </div>
                                    <div id={"rating_zone"}>
                                        <div id={"rating_input"}>
                                            <InputLabel>Note</InputLabel>
                                            <Select ref={rating_ref} onChange={(e) => setRating(e.target.value)}
                                                    variant={"outlined"} id={"select"}>
                                                <MenuItem value={"0"}>0</MenuItem>
                                                <MenuItem value={"1"}>1</MenuItem>
                                                <MenuItem value={"2"}>2</MenuItem>
                                                <MenuItem value={"3"}>3</MenuItem>
                                                <MenuItem value={"4"}>4</MenuItem>
                                                <MenuItem value={"5"}>5</MenuItem>
                                            </Select>
                                        </div>
                                        <div title={"Envoyer la note"}>
                                            <SendIcon id={"send_icon"} onClick={() => rate(rating)}
                                                      style={{fontSize: "20px"}}/>
                                        </div>
                                        <Snackbar anchorOrigin={{horizontal: "right", vertical: "top"}}
                                                  open={openRatingSent} autoHideDuration={2000}
                                                  onClose={handleCloseSnack}>
                                            <Alert onClose={handleCloseSnack} severity="success">
                                                Note envoyée! ({rating}/5)
                                            </Alert>
                                        </Snackbar>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                <div id={"test_zone"}>
                                    <div id={"test"}>
                                        <h1 className={"card_title"}>Tester l'effet audio du plugin</h1>
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