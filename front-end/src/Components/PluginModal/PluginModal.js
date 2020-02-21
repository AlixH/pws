import React from "react";
import './PluginModal.css';
import {Modal} from "@material-ui/core";
import Plugin from "../Plugin/Plugin";
import {OPEN_PLUGIN_DETAILS} from "../../store/actions/OpenPluginDetails";
import {useDispatch, useSelector} from "react-redux";
import shallowEqual from "react-redux/lib/utils/shallowEqual";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";


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
                            </div>
                        </CardContent>
                    </Card>
                </div>
                {isLoggedIn ?
                    <div className={"card"}>
                        <Card raised={true}>
                            <CardContent>
                                <div id={"test"}>
                                    <h1 className={"card_title"}>Votre avis</h1>
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