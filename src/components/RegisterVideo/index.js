import React from "react";
import { StyledRegisterVideo } from "./styles";
import {getVideoId} from "../Helpers";


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


// Get all playlists stored in localStorage
function getAllPlaylists(){
    let playlists = JSON.parse(localStorage.getItem('playlists'));
    return playlists;
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
                let videoID = getVideoId(formRegister.values.url);

                // Add new Video in localStorage
                //const newPlaylists = getAllPlaylists();
                const newPlaylists = props.playlists;
                newPlaylists[formRegister.values.playlist].push({
                    title: formRegister.values.title,
                    url: formRegister.values.url,
                    thumb: `https://img.youtube.com/vi/${videoID}/hqdefault.jpg`,
                })
                
                localStorage.setItem('playlists', JSON.stringify(newPlaylists));
                
                props.setFormVisibility(false);
                formRegister.clearForm();
            }}>
                <div>
                    <h1>Video Register</h1>
                    <br></br>
                    <button type="button" className="close-modal" onClick={() => {props.setFormVisibility(false); formRegister.clearForm();}}>
                        X
                    </button>
                    <input placeholder="Video Name" value={formRegister.values.title} 
                        name="title"
                        onChange={formRegister.handleChange}/>
                    <input placeholder="URL" value={formRegister.values.url} 
                        name="url"
                        onChange={formRegister.handleChange}/>
                    
        
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
                </div>
            </form>
        ) : false}
        
    </StyledRegisterVideo>
    )
}