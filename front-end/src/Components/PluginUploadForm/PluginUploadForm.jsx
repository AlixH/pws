import React, {useRef, useState} from "react";
import './PluginUploadForm.css';
import {SET_PLUGINUPLOAD_SUCCESS} from "../../store/actions/PluginUploadActions/PluginUploadSuccess";
import {SET_PLUGINUPLOAD_PENDING} from "../../store/actions/PluginUploadActions/PluginUploadPending";
import {SET_PLUGINUPLOAD_ERROR} from "../../store/actions/PluginUploadActions/PluginUploadError";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from '@material-ui/core/CardHeader';
import NavBar from "../Navbar/Navbar";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Select from "@material-ui/core/Select";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import MenuItem from "@material-ui/core/MenuItem";
import {InputLabel} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Chip from "@material-ui/core/Chip";
import {useDispatch} from "react-redux";
import Typography from "@material-ui/core/Typography";
import {useHistory} from "react-router-dom";


function PluginUploadForm() {

    const stepsOpenSource = ['Formulaire', 'Upload archive ZIP', 'Validation'];
    const stepsClosedSource = ['Formulaire', 'Validation'];
    const zip_input = useRef();
    const dispatch = useDispatch();
    const [openSource, setOpenSource] = useState(false);
    const [description, setDescription] = useState("");
    const [steps, setSteps] = useState(stepsClosedSource);
    const [name, setName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [zipFile, setZipFile] = useState(null);
    const [tags, setTags] = useState([]);
    const [videoUrl, setVideoUrl] = useState("");
    const [category, setCategory] = useState("");
    const [version, setVersion] = useState("");
    const [activeStep, setActiveStep] = useState(0);
    let formValid = description.trim() !== "" && name.trim() !== "" && imageUrl.trim() !== "" && category.trim() !== "" && version.trim() !== "";

    const history = useHistory();

    console.log("################ ", zipFile);

    function removeTag(index) {
        let tmp = [...tags];
        console.log(index);
        tmp.splice(index, 1);
        setTags(tmp)

    }


    function upload() {
        dispatch(setPluginUploadPending(true));
        callPluginUploadApi(name, description, videoUrl, imageUrl, version, openSource, category, tags, zipFile, (error) => {
            if (error) {
                dispatch(setPluginUploadPending(false));
                dispatch(setPluginUploadError(true));
            } else {
                dispatch(setPluginUploadPending(false));
                dispatch(setPluginUploadSuccess());
            }
        });
    }

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
    ;
    /**
     * This method is a callback after calling the upload method
     * needs: name, description, version, author, updated_on, video_url, thumbnail_url, zip_url, category, open_source, tags
     * @param {*} name
     * @param {*} description
     * @param {*} version
     * @param {*} video_url
     * @param {*} image_url
     * @param {*} category
     * @param {*} open_source
     * @param {*} tags
     * @param zipFile
     * @param {*} callback
     */
    const callPluginUploadApi = async (name, description, video_url, image_url, version, open_source, category, tags, zipFile, callback) => {
        let Url = `http://localhost:4000/plugins/add`;
        let response = await fetch(Url, {
            method: 'post',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": name.replace(' ', "_"),
                "author": "",
                "description": description,
                "video_url": video_url,
                "thumbnail_url": image_url,
                "version": version,
                "opensource": open_source,
                "category": category,
                "tags": tags,
                "authorId": "",
                "zip_url": "zip_url",
            })
        });
        if (open_source) {
            response = await response.json();
            let pluginId = response.data.pluginId;
            /*
             * Requete pour upload le zipFile
            */
            let upload_zipFile_Url = `http://localhost:4000/files/upload`;
            const formData = new FormData();
            const renamedZip = new File([zipFile], `${pluginId}.zip`, {type: zipFile.type});
            formData.append('file1', renamedZip);
            formData.append('pluginId', pluginId);
            let request = new XMLHttpRequest();
            request.open("POST", upload_zipFile_Url);
            request.send(formData);

            if (response.status === "error") {
                console.log("data.status = error");
                callback(true);
            } else {
                callback(false);
            }
        }
    };


    function handleKeyPress(e) {
        const input = e.target.value;
        if (e.key === 'Enter' && input.trim() !== '') {
            setTags([...tags, input]);
            e.target.value = ""
        }
    }

    function nextStep() {
        setActiveStep(activeStep + 1);
    }

    function handleSwitch(e) {
        const input = e.target.checked;
        setOpenSource(input);
        if (input === true) {
            setSteps(stepsOpenSource)
        } else if (input === false) {
            setSteps(stepsClosedSource)
        }
    }

    function prevStep() {
        setActiveStep(activeStep - 1)
    }


    function zipSelected(e) {
        const file = e.target.files[0];
        const name = file.name;
        if (name.split('.').length > 1 && name.split('.')[1] == 'zip') {
            setZipFile(file)
        } else {
            alert("Vous devez sélectionner un fichier ZIP")
        }
    }

    function deleteFile() {
        setZipFile(null);
        zip_input.current.value = null;
        console.log(zip_input.current)
    }

    function submit() {
        upload();
        nextStep();
    }

    return (
        <div id={"plugin_upload_page"}>
            <NavBar/>
            <Card raised={"true"} id={"card"}>
                <CardHeader id={"upload_title"} title={"Publiez votre plugin"}>
                </CardHeader>
                <CardContent id={"upload_form_content"}>
                    <Stepper id={"stepper"} activeStep={activeStep} alternativeLabel>
                        {steps.map(label => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === 0 &&
                    (<div id={"upload_form"} name="pluginUploadForm">
                        <div className={"upload_input"}>
                            <TextField margin={"normal"} className={"textField"}
                                       required
                                       autoComplete={"off"}
                                       id="outlined-required"
                                       value={name}
                                       label="Nom"
                                       defaultValue=""
                                       variant="outlined"
                                       onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className={"upload_input"}>
                            <TextField margin={"normal"} className={"textField"}
                                       required
                                       value={version}
                                       autoComplete={"off"}
                                       id="outlined-required"
                                       label="Version"
                                       defaultValue=""
                                       variant="outlined"
                                       onChange={(e) => setVersion(e.target.value)}
                            />
                        </div>
                        <div className={"upload_input"}>
                            <TextField margin={"normal"} className={"textField"}
                                       autoComplete={"off"}
                                       id="outlined-required"
                                       onChange={(e) => setVideoUrl(e.target.value)}
                                       name="video_url"
                                       value={videoUrl}
                                       label="URL Vidéo"
                                       defaultValue=""
                                       variant="outlined"
                            />
                        </div>
                        <div className={"upload_input"}>
                            <TextField margin={"normal"} className={"textField"}
                                       required
                                       onChange={(e) => setImageUrl(e.target.value)}
                                       id="outlined-required"
                                       autoComplete={"off"}
                                       name="image_url"
                                       value={imageUrl}
                                       label="URL image"
                                       defaultValue=""
                                       variant="outlined"
                            />
                        </div>
                        <div id={"category_input"} >
                            <InputLabel>Catégorie*</InputLabel>
                            <Select  variant={"outlined"} id={"select"} value={category}
                                    onChange={(e) => setCategory(e.target.value)}>
                                <MenuItem value={"Modulation"}>Modulation</MenuItem>
                                <MenuItem value={"Distorsion"}>Distorsion</MenuItem>
                                <MenuItem value={"Egalisation"}>Egalisation</MenuItem>
                                <MenuItem value={"Reverb"}>Reverb</MenuItem>
                                <MenuItem value={"Accordeur"}>Accordeur</MenuItem>
                            </Select>
                        </div>
                        <div>
                            <FormControlLabel
                                control={
                                    <Switch onChange={(e) => handleSwitch(e)} checked={openSource} value={openSource}/>
                                }
                                label="Open-Source"
                            /></div>
                        <div id={"desc"}>
                            <TextField className={"textField"} margin={"normal"}
                                       required
                                       id="outlined-required"
                                       value={description}
                                       name="tags"
                                       rows={10}
                                       rowsMax={10}
                                       label="Description"
                                       autoComplete={"off"}
                                       variant="outlined"
                                       multiline={true}
                                       onChange={(e) => setDescription(e.currentTarget.value)}
                            />
                        </div>
                        <div id={"tags"}>
                            {tags.map((tag, index) => {
                                return <Chip onDelete={(e) => removeTag(index)} index={index} className={"tag"}
                                             color={"primary"} variant={"outlined"} label={tag}/>
                            })}
                        </div>
                        <div id={"tags_input"}>
                            <TextField className={"textField"} margin={"normal"}
                                       required
                                       id="outlined-required"
                                       name="tags"
                                       label="Tags"
                                       autoComplete={"off"}
                                       variant="outlined"
                                       onKeyPress={(e) => handleKeyPress(e)}
                            />
                        </div>
                        <Typography>Ecrivez, et appuyez sur "Entrée" pour ajouter un nouveau tag</Typography>
                    </div>)
                    }
                    {activeStep !== 0 && activeStep !== steps.length - 1 &&
                    <div id={"zip_section"}>
                        <div id={"file_section"}>
                            <Button id="zip_button" color={"secondary"} variant="contained" component="label">
                                Charger l'archive du plugin
                                <input ref={zip_input} id="raised-button-file" type="file" name="file"
                                       style={{display: "none"}}
                                       onChange={(e) => zipSelected(e)}
                                />
                            </Button>
                            {zipFile !== null && <p onClick={() => deleteFile()} style={{
                                color: "blue",
                                textDecoration: "underline",
                                marginLeft: '2%'
                            }}>Supprimer</p>}
                        </div>
                        {zipFile !== null &&
                        <p style={{color: "green", textAlign: "center"}}>Fichier chargé! ({zipFile.name})</p>}
                    </div>
                    }
                    {activeStep === steps.length - 1 &&
                    <div id={"validation"}>
                        <p id={"congrats"}>Félicitations : votre plugin a été ajouté au magasin!</p>
                        <CheckCircleIcon id="check_icon"/>
                    </div>
                    }
                    <div id={"bottom_buttons"}>
                        {activeStep !== 0 && activeStep !== steps.length - 1 &&
                        <div>
                            <Button onClick={() => prevStep()} variant={"contained"}
                                    color={"primary"}>Précédent</Button>
                        </div>
                        }
                        {activeStep === 0 && openSource &&
                        <div>
                            <Button onClick={() => nextStep()} disabled={!formValid} variant={"contained"}
                                    color={"primary"}>Suivant</Button>
                        </div>
                        }
                        {((activeStep !== 0 && activeStep !== steps.length - 1) || (activeStep === 0 && !openSource)) &&
                        <div>
                            <Button onClick={() => submit()}
                                    disabled={(!formValid && activeStep === 0) || (activeStep === 1 && zipFile === null)}
                                    variant={"contained"}
                                    color={"primary"}>Soumettre</Button>
                        </div>}
                        {activeStep === steps.length - 1 &&
                        <div><Button variant={"contained"} color={"secondary"} size={"large"}
                                     onClick={() => setActiveStep(0)}>Publier un autre plugin</Button></div>
                        }
                        {activeStep === steps.length - 1 && <div>
                            <Button variant={"contained"} size={"large"} color={"primary"}
                                    onClick={() => history.push('/home')}>Retourner à l'accueil</Button>
                        </div>}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}


export default PluginUploadForm;