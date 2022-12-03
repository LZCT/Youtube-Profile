import React from "react";
import { StyledPlaylistInfo } from "./styles";


//Custom Hook - RenamePlaylist 
function useRenamePlaylist(value, setValue){    
    return {
        value,
        handleChange: e => {
            setValue(e.target.value);
        },
        clearForm(){
            setValue("");
        }
    };
}


function PlaylistInfo(props){
    // State with the nem playlisy name
    const [newPlaylistName, setNewPlaylistName] = React.useState("");
    const renamePlaylist = useRenamePlaylist(newPlaylistName, setNewPlaylistName);
    // State to disable "Rename Playlist" button
    const [isDisabled, setIsDisabled] = React.useState(true);

     //Enable "Rename Playlist" button when the new playlist name are filled in
     React.useEffect(() => {
        if(newPlaylistName.trim().length > 0)   
            setIsDisabled(false);  
        else
            setIsDisabled(true);
    }, [newPlaylistName]);
    
    

    return(
        <StyledPlaylistInfo>
            {props.playlistInfo.visibility ? (
                        
                        <form onSubmit={(e) => {
                           
                            e.preventDefault();
                            // Check if the new playlist name is the same that the old one
                            if(newPlaylistName == props.playlistInfo.name){
                                document.getElementById("errorRenamePlaylist").innerHTML = `The playlist already has that name! Select another name!<br/><br/>`;
                                renamePlaylist.clearForm();
                                return;
                            }
                            // Check if already exists a playlist with the new name
                            if(newPlaylistName in props.playlists){
                                document.getElementById("errorRenamePlaylist").innerHTML = `A playlist with the name "${newPlaylistName}" already exists! Select another name!<br/><br/>`;
                                renamePlaylist.clearForm();
                                return;
                            }

                            //Deep cloning playlists state
                            let newPlaylist = JSON.parse(JSON.stringify(props.playlists));
                            //Rename playlist
                            newPlaylist[newPlaylistName] = newPlaylist[props.playlistInfo.name];
                            delete newPlaylist[props.playlistInfo.name];
                            //Save playlists to the localstorage
                            localStorage.setItem('playlists', JSON.stringify(newPlaylist));
                            // Update playlists state
                            props.setPlaylists(newPlaylist);
                            // Close Modal
                            props.setPlaylistInfo({visibility: false})
                            // Clear Form
                            renamePlaylist.clearForm();
                        }}>
                            <div>
                                <h1>Playlist Settings</h1>
                                <br/><br/>
                                <h3>{props.playlistInfo.name}</h3>
                                
                                <h4>{props.playlistInfo.numberOfVideos} videos</h4>
                                <br/>    
                                <input placeholder="New Playlist Name" maxLength="100" value={renamePlaylist.value} 
                                    name="newPlaylistName"
                                    onChange={renamePlaylist.handleChange}/>
                                
                                <span id="errorRenamePlaylist"></span>
                                
                                <button type="Submit" disabled={isDisabled}>
                                    Rename Playlist
                                </button>

                        
                        <br/>
                        
                        <button onClick={() => {
                            //Deep cloning playlists state
                            let newPlaylist = JSON.parse(JSON.stringify(props.playlists));
                            //Delete playlist
                            delete newPlaylist[props.playlistInfo.name];
                            //Save playlists to the localstorage
                            localStorage.setItem('playlists', JSON.stringify(newPlaylist));
                            // Update playlists state
                            props.setPlaylists(newPlaylist);
                            // Close Modal
                            props.setPlaylistInfo({name: "", numberOfVideos: 0, visibility: false})

                        }}>
                            Remove Playlist
                        </button>

                        <button type="button" className="close-modal" onClick={() => {props.setPlaylistInfo({visibility: false}); renamePlaylist.clearForm();}}>
                            X
                        </button>
                        
                        </div>
                    </form>

                    
               
                
            ) : false}
        </StyledPlaylistInfo>
    )
    
}


export default PlaylistInfo;