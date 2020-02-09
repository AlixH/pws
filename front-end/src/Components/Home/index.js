import React from 'react';
import './style.css';
import Plugin from "../Plugin/Plugin";
import {useStore} from "react-redux";

const url = "localhost/plugins";

async function fetchPlugins() {
  const response = await fetch(url);
  const plugins = await response.json();
  return plugins;
}

function Home(properties){
  const plugins = useStore()
  return (
    //plugins.map(plugin => (
      //  <Plugin plugin={plugin}/>
    //)
    <p>Hello from Home !</p>
  //)
  )
}

export default Home
