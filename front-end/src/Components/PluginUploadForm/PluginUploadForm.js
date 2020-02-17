import React, {Component} from "react";
import {connect, useDispatch} from 'react-redux';
import './PluginUploadForm.css';
import {SET_PLUGINUPLOAD_SUCCESS} from "../../store/actions/PluginUploadActions/PluginUploadSuccess";
import {SET_PLUGINUPLOAD_PENDING} from "../../store/actions/PluginUploadActions/PluginUploadPending";
import {SET_PLUGINUPLOAD_ERROR} from "../../store/actions/PluginUploadActions/PluginUploadError";

import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

// import {FormControl, TextField, Input, Button} from "@material-ui/core";

class PluginUploadForm extends Component{

    constructor(props) {
      super(props);
      this.state = {};
      this.state = {
            name: "",
            description: "",
            video_url: "",
            image_url: "",
            version: "",
            open_source: false,
            category: "",
            tags: "",
            authorId: "",
            zipFile: null,
      };
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
                <div className="divUpload">
                  <TextField className="textField"
                      required
                      id="outlined-required"
                      name="name"
                      label="Name"
                      defaultValue=""
                      variant="outlined"
                      value={this.state.value}
                      onChange={e => this.setState({name: e.target.value})}
                  />


        
                <TextField className="textField"
                      required
                      id="outlined-required"
                      name="description"
                      label="description"
                      defaultValue=""
                      variant="outlined"
                      onChange={e => this.setState({description: e.target.value})}
                  />

                <TextField className="textField"
                      required
                      id="outlined-required"
                      name="video_url"
                      label="Video URL"
                      defaultValue=""
                      variant="outlined"
                      onChange={e => this.setState({video_url: e.target.value})}
                />
        
                <TextField className="textField"
                      required
                      id="outlined-required"
                      name="image_url"
                      label="Image URL"
                      defaultValue=""
                      variant="outlined"
                      onChange={e => this.setState({image_url: e.target.value})}
                />
        
                <TextField className="textField"

                      required
                      id="outlined-required"
                      name="version"
                      label="Version"
                      defaultValue=""
                      variant="outlined"
                      onChange={e => this.setState({version: e.target.value})}
                />
        
                <TextField className="textField"

                      required
                      id="outlined-required"
                      name="category"
                      label="Category"
                      defaultValue=""
                      variant="outlined"
                      onChange={e => this.setState({category: e.target.value})}
                />
        
                <TextField className="textField"

                      required
                      id="outlined-required"
                      name="tags"
                      label="Tags"
                      defaultValue=""
                      variant="outlined"
                      onChange={e => this.setState({tags: e.target.value})}
                />
        
                <TextField  className="textField"

                      required
                      id="outlined-required"
                      name="authorId"
                      label="Author Id"
                      defaultValue=""
                      variant="outlined"
                      onChange={e => this.setState({authorId: e.target.value})}
                />

              <p>
                Upload Plugin zip
              
                 <input id="raised-button-file"  type="file" name="file" onChange={e =>  this.setState({
                    zipFile: e.target.files[0],
                    loaded: 0,
                  })}/>
                
              </p>

              <p>
                Open Source?  <Checkbox onChange={e => this.setState({open_source: !open_source})}/>
              </p>
                

              <Button name="submit" className="button" variant="contained" color="primary"  onClick={this.onSubmit}>
                Submit
              </Button>
                  
              </div>
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
            authorId,
        } = this.state;


console.log("___ payload to submit in request : _____");
console.log(this.state);

        this.props.upload(name, description, video_url, image_url, version, open_source, category, tags, authorId,);
        this.setState({
            name: "",
            description: "",
            video_url: "",
            image_url: "",
            version: "",
            open_source: "",
            category: "",
            tags: "",
            authorId: "",
            zipFile: null,
        });
    }
}

const upload = (name, description, video_url, image_url, version, open_source, category, tags, authorId) => {
    return dispatch => {
      dispatch(setPluginUploadPending(true));

  
      callPluginUploadApi(name, description, video_url, image_url, version, open_source, category, tags, authorId,  (error) => {
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