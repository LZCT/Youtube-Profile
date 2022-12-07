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
            if(document.getElementById(name + "_error"))
                document.getElementById(name + "_error").innerHTML = "";
        },
        clearForm(){
            setValues({title: "", url: "", playlist: "DEFAULT", newPlaylist: ""});
        }
    };
}




export default function RegisterVideo(props){
    // State to disable submit button
    const [isDisabled, setIsDisabled] = React.useState(true);
    // State to New Playlist Input Field
    const [isNewPlaylist, setIsNewPlaylist] = React.useState(false);
    // State with the values of the form
    const [values, setValues] = React.useState({title: "", url: "", playlist: "DEFAULT", newPlaylist: ""});
    const formRegister = useForm(values, setValues);
    
    //Enable "New Playlist" input field when the new playlist is select
    React.useEffect(() => {
        if(formRegister.values.playlist === "NEW"){
            console.log(formRegister.values.playlist);
            setIsNewPlaylist(true);
        }   
        else
            setIsNewPlaylist(false);
    }, [formRegister.values.playlist]);

    //Enable submit button when all form fields are filled in
    React.useEffect(() => {
        if(values.title.trim().length > 0 && values.url.trim().length > 0 && values.playlist != "DEFAULT"){
            if(isNewPlaylist && values.newPlaylist.trim().length <= 0){ 
                console.log(">", isNewPlaylist)
                setIsDisabled(true);
            }  
            else{
                console.log(">New: ", isNewPlaylist, "lenght: ", values.newPlaylist.trim().length);
                setIsDisabled(false);
            }
        } 
        else
            setIsDisabled(true);
    }, [values,isNewPlaylist]);
    
    
    
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
                    document.getElementById("url_error").innerHTML = "Invalid Youtube URL! <br/> Please check the link and try again!";
                    return;
                }

                //Deep cloning playlists state  
                let newPlaylists = JSON.parse(JSON.stringify(props.playlists));
                let videoPlaylist = formRegister.values.playlist;

                // Check if the video will be in a new playlist
                if(isNewPlaylist){
                    // Check if the playlist name already exists
                    if(formRegister.values.newPlaylist in props.playlists){
                        document.getElementById("newPlaylist_error").innerHTML = `A playlist with the name "${formRegister.values.newPlaylist}" already exists! Select another name!<br/><br/>`;
                        return;
                    }

                    // Create new playlist
                    newPlaylists[formRegister.values.newPlaylist] = [];
                    // Set the playlist where the video will be saved to the new playlist
                    videoPlaylist = formRegister.values.newPlaylist;
                }
                else{
                    //Check if Video is already in playlist
                    const videoIsInPlaylist = props.playlists[videoPlaylist].findIndex(video => {
                    return getVideoId(video.url) === videoID;
                     });
                
                    // If Video is already in playlist, show error message
                    if (videoIsInPlaylist != -1){
                        document.getElementById("url_error").innerHTML = "This video already belongs to this playlist! <br/> Select another playlist or another video!";
                        return;
                    }
                }   
                

               
                // Add New Video
                newPlaylists[videoPlaylist].push({
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
                    
                    <span id="url_error"></span>
                    
                    <label>Playlist</label>
                    <select id="playlists" name="playlist" onChange={formRegister.handleChange} value={formRegister.values.playlist}>
                        <option value="DEFAULT" key="optionDefault" disabled> -- Select a Playlist -- </option>
                        <option value="NEW" key="optionNew"> Create new Playlist... </option>
                        {
                            Object.keys(props.playlists).map((playlistName) => {
                                return (<option value={playlistName} key={playlistName}>{playlistName}</option>)
                        })}
    
                    </select>
                    
                    {isNewPlaylist ? <input placeholder="New Playlist Name" value={formRegister.values.newPlaylist} 
                        name="newPlaylist" id="newPlaylist" maxLength="50"
                        onChange={formRegister.handleChange}/> : ""
                    }

                    <span id="newPlaylist_error"></span>
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