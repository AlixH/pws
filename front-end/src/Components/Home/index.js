import React, {useEffect} from 'react';
import './style.css';
import {useDispatch, useSelector} from "react-redux";
import {SET_PLUGIN_LIST} from "../../store/actions/PluginList";
import Plugin from "../Plugin/Plugin";
import shallowEqual from "react-redux/lib/utils/shallowEqual";
import NavBar from "../Navbar/Navbar";


function Home(properties) {

    const dispatch = useDispatch();
    const pluginsList = useSelector(state => state.pluginListReducer.pluginsList, shallowEqual);

    async function fetchPlugins() {

        const url = "http://localhost:4000/plugins";
        const fetchDetails = {
            method: 'get',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };
        try {
            let response = await fetch(url, fetchDetails);
            if (!response || response.status !== 200) {
                console.error("Error while fetching from server")
            } else {
                response = await response.json();
                if (response && response.data && response.data.plugins) {
                    dispatch({
                        type: SET_PLUGIN_LIST,
                        pluginsList: response.data.plugins
                    });
                }
            }
        } catch (e) {
            console.error(e);

        }
    }

    useEffect(() => {
        fetchPlugins();
    }, []);

    let list = (pluginsList || []).map(plugin => {
        return <Plugin plugin={plugin}/>
    });

    return (
        <div id={"page"}>
            <NavBar/>
            <div id={"list"}>
                {list}
            </div>
        </div>
    )
}

export default Home