import React from "react";
import { StyledRegisterVideo } from "./styles";
import {getVideoId} from "../../../Helpers";


//Custom Hook - Form 
function useForm(values, setValues){    
    return {
        values,
        handleChange: e => {
            const value = e.target.value;
            const name = e.target.name;
            setValues({
                ...values,
                [name]: value,

            });
        },
        clearForm(){
            setValues({title: "", url: "", playlist: "DEFAULT"});
        }
    };
}


export default function RegisterVideo(props){
    // State to disable submit button
    const [isDisabled, setIsDisabled] = React.useState(true);
    // State with the values of the form
    const [values, setValues] = React.useState({title: "", url: "", playlist: "DEFAULT"});
    const formRegister = useForm(values, setValues);
    
    //Enable submit button when all form fields are filled in
    React.useEffect(() => {
        if(values.title.trim().length > 0 && values.url.trim().length > 0 && values.playlist != "DEFAULT")   
            setIsDisabled(false);  
        else
            setIsDisabled(true);
    }, [values]);
    
    
    return (
    <StyledRegisterVideo>
        <button className="add-video" onClick={() => props.setFormVisibility(true)}>
            +
        </button>
        
        {props.formVisibility ? (
            <form onSubmit={(e) => {
                e.preventDefault();
                // Get Video ID
                const videoID = getVideoId(formRegister.values.url);

                // Check if the Youtube URL is correct
                if(!videoID){
                    document.getElementById("error").innerHTML = "Invalid Youtube URL! <br/> Please check the link and try again!";
                    return;
                }
                    
                //Check if Video is already in playlist
                const videoIsInPlaylist = props.playlists[formRegister.values.playlist].findIndex(video => {
                    return getVideoId(video.url) === videoID;
                  });
                
                // If Video is already in playlist, show error message
                if (videoIsInPlaylist != -1){
                    document.getElementById("error").innerHTML = "This video already belongs to this playlist! <br/> Select another playlist or another video!";
                    return;
                }

                //Deep cloning playlists state  
                const newPlaylists = JSON.parse(JSON.stringify(props.playlists));

                // Add New Video
                newPlaylists[formRegister.values.playlist].push({
                    title: formRegister.values.title,
                    url: formRegister.values.url,
                    thumb: `https://img.youtube.com/vi/${videoID}/hqdefault.jpg`,
                })

                // Update localStorage and update state
                localStorage.setItem('playlists', JSON.stringify(newPlaylists));
                props.setPlaylists(newPlaylists);
                
                // Close modal
                props.setFormVisibility(false);
                formRegister.clearForm();

            }}>
                <div>
                    <h1>Video Register</h1>
                    <br></br>
                    <button type="button" className="close-modal" onClick={() => {props.setFormVisibility(false); formRegister.clearForm();}}>
                        X
                    </button>
                    
                    <label>Video Name</label>
                    <input placeholder="Video Name" maxLength="100" value={formRegister.values.title} 
                        name="title"
                        onChange={formRegister.handleChange}/>
                    
                    <label>Video URL</label>
                    <input placeholder="URL" value={formRegister.values.url} 
                        name="url"
                        onChange={formRegister.handleChange}/>
                    
                    <span id="error"></span>
                    
                    <label>Playlist</label>
                    <select id="playlists" name="playlist" onChange={formRegister.handleChange} value={formRegister.values.playlist}>
                        <option value="DEFAULT" key="optionDefault" disabled> -- Select a Playlist -- </option>
                        {
                            Object.keys(props.playlists).map((playlistName) => {
                                return (<option value={playlistName} key={playlistName}>{playlistName}</option>)
                        })}
    
                    </select>
                    
                    <br/>   
                    <button type="Submit" disabled={isDisabled}>
                        Submit
                    </button>
                    <br/>
                    
                </div>
            </form>
        ) : false}
        
    </StyledRegisterVideo>
    )
}