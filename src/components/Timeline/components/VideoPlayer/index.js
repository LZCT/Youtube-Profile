import React from "react";
import {getVideoId} from "../../../Helpers";
import { StyledVideoPlayer } from "./styles";



const VideoPlayer = (props) => {
    
    const videoID = getVideoId(props.videoPlaying.url);
    return(
        <StyledVideoPlayer>
             {props.videoPlayerVisibility ? (
                <div className="videoPlayer">
                    <div>
                        <h2>{props.videoPlaying.name}</h2>

                        {/* YouTube video player - Embed*/}
                        <br/>
                        <iframe max-width="853" height="505" src={`https://www.youtube.com/embed/${videoID}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        <br/>

                        {/* Button to remove video*/}
                        <button type="button" className="remove-video" onClick={() => {
                            {/* Search for the video in the playlist*/}
                            const videoToRemove = props.playlists[props.videoPlaying.playlist].findIndex(video => {
                                return video.url === props.videoPlaying.url;
                            });
                            //Deep cloning playlists state
                            let newPlaylist = JSON.parse(JSON.stringify(props.playlists));
                            //Remove video from array
                            newPlaylist[props.videoPlaying.playlist].splice(videoToRemove, 1);
                            //Save new playlist to the localstorage
                            localStorage.setItem('playlists', JSON.stringify(newPlaylist));
                            // Update playlists state
                            props.setPlaylists(newPlaylist);
                            // Closes video player modal
                            props.setVideoPlayerVisibility(false);
                        }} >
                            Remove from Playlist
                        </button>

                        <button type="button" className="close-modal" onClick={() => props.setVideoPlayerVisibility(false)}>
                            X
                        </button>
                        
                    </div>
                </div>
        ) : false}
        </StyledVideoPlayer>
    )
}

export default VideoPlayer;