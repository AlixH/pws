import React, {Component} from "react";
import {connect, useDispatch} from 'react-redux';
import './PluginUploadForm.css';
import {SET_PLUGINUPLOAD_SUCCESS} from "../../store/actions/PluginUploadActions/PluginUploadSuccess";
import {SET_PLUGINUPLOAD_PENDING} from "../../store/actions/PluginUploadActions/PluginUploadPending";
import {SET_PLUGINUPLOAD_ERROR} from "../../store/actions/PluginUploadActions/PluginUploadError";

// import {FormControl, TextField, Input, Button} from "@material-ui/core";

class PluginUploadForm extends Component{

    constructor(props) {
      super(props);
      this.state = {};
      this.onSubmit = this.onSubmit.bind(this);
    }

    render(){
        let {
            name,
            description,
            video_url,
            image_url,
            version,
            open_source,
            category,
            tags,
            authorId
        } = this.state;
        let {
            pluginUploadPending, 
            pluginUploadSuccess, 
            pluginUploadError
        } = this.props;
        return (
            <form name="pluginUploadForm">
                <pre>Upload Plugin</pre>
                <input name="name" placeholder="Name"></input>
                <textarea name="description" placeholder="Description"></textarea>
                <textarea name="video_url" placeholder="Video URL"></textarea>
                <textarea name="image_url" placeholder="Image URL"></textarea>
                <input name="version" placeholder="Version"></input>
                <div class="checkbox-input-wrapper">
                  Open Source?
                  <input type="checkbox" name="open_source"></input>
                </div>
                <input name="category" placeholder="Category"></input>
                <input name="tags" placeholder="Tags"></input>
                <input name="authorId" placeholder="Author Id"></input>
                <input type="submit" name="submit" value="Upload"></input>
            </form>
        );
    }

    onSubmit(e) {
        e.preventDefault();
        let {
            name,
            description,
            video_url,
            image_url,
            version,
            open_source,
            category,
            tags,
            authorId
        } = this.state;
        this.props.upload(name, description, video_url, image_url, version, open_source, category, tags, authorId);
        this.setState({
            name: "",
            description: "",
            video_url: "",
            image_url: "",
            version: "",
            open_source: "",
            category: "",
            tags: "",
            authorId: ""
        });
    }
}

const upload = (name, description, video_url, image_url, version, open_source, category, tags, authorId) => {
    return dispatch => {
      dispatch(setPluginUploadPending(true));
  
      callPluginUploadApi(name, description, video_url, image_url, version, open_source, category, tags, authorId, (error) => {
        if (error) {
          dispatch(setPluginUploadPending(false));
          dispatch(setPluginUploadError(true));
        } else {
          dispatch(setPluginUploadPending(false));
          dispatch(setPluginUploadSuccess());
        }
      });
    }
  };

  /**
   * This action indicates that the plugin upload request has been sent : pending status
   * @param {*} pluginUploadPending
   */
  const setPluginUploadPending = (pluginUploadPending) => {
    return {
      type: SET_PLUGINUPLOAD_PENDING,
      pluginUploadPending
    };
  }
  
  /**
   * This action indicates that the plugin upload request has succeeded
   * @param {*} pluginUploadSuccess
   */
  const setPluginUploadSuccess = (pluginUploadSuccess) => {
    return {
      type: SET_PLUGINUPLOAD_SUCCESS,
      pluginUploadSuccess
    };
  }
  
  /**
   * This action indicates that the plugin upload request has failed
   * @param {*} pluginUploadError
   */
  const setPluginUploadError = (pluginUploadError) => {
    return {
      type: SET_PLUGINUPLOAD_ERROR,
      pluginUploadError
    }
  }



/**
 * This method is a callback after calling the upload method
 * needs: name, description, version, author, updated_on, video_url, thumbnail_url, zip_url, category, open_source, tags
 * @param {*} name
 * @param {*} description
 * @param {*} version
 * @param {*} authorId
 * @param {*} video_url
 * @param {*} image_url
 * @param {*} category
 * @param {*} open_source
 * @param {*} tags
 * @param {*} callback
 */
const callPluginUploadApi = async (name, description, video_url, image_url, version, open_source, category, tags, authorId, callback) => {
    let Url = `http://localhost:4000/plugins/add`;
    let response = await fetch(Url, {
        method: 'post',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "name": name,
            "description": description,
            "video_url": video_url,
            "image_url": image_url,
            "version": version,
            "open_source": open_source,
            "category": category,
            "tags": tags,
            "authorId": authorId,
        })
    });
  
    await response.json().then((data) => {
        if (data.status === "error") {
            console.log("data.status = error");
            callback(true);
        } else{
            callback(false);
        }
    });
}

const mapStateToProps = (state) => {
    return {
            pluginUploadPending: state.pluginUploadPending,
            pluginUploadSuccess: state.pluginUploadSuccess,
            pluginUploadError: state.pluginUploadError
        };
};

const mapDispatchToProps = (dispatch) => {
    return {
        upload: (name, description, video_url, image_url, version, open_source, category, tags, authorId) => 
        upload(name, description, video_url, image_url, version, open_source, category, tags, authorId)(dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PluginUploadForm);