import React from 'react';
import './style.css';

import Plugin from "../Plugin/Plugin";
import {useDispatch, useStore} from "react-redux";
// import {SET_PLUGIN_LIST} from "../../store/actions/PluginList";

// const url = "http://localhost:4000/plugins";
// const fetchDetails = {
//     method: 'get',
//     mode: 'cors',
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//     }
// };
// async function fetchPlugins() {
//     const response = await fetch(url, fetchDetails);
//     return await response.json();
// }
async function Home(properties){
    // //on render, fetch the list of all plugins
    // const plugins = fetchPlugins().then();
    // const dispatch = useDispatch();
    // dispatch({
    //     type:SET_PLUGIN_LIST,
    //     list:plugins
    // });
    // //let pluginList =  plugins.data.plugins.map(plugin => {
    // //return <Plugin />});
    return (
        <div>
            <p>Hello from Home !</p>
        </div>
    )
}
export default Home;
