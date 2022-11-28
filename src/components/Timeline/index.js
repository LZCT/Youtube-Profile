import React from "react";
import {StyledTimeline} from "./styles";
import config from "../../../config.json";

// Function to check if a playlist is empty
function isPlaylistEmpty(numberOfVideos, isSearch){
    if(numberOfVideos === 0){
        if(isSearch)
            return <h2 className="playlist-empty">There are no videos in this playlist that match your search!</h2>;
        return <h2 className="playlist-empty">This playlist is empty!</h2>;
    }
        
}

function Timeline({searchValue, ...props}) {
    const playlistNames = Object.keys(props.playlists);
    const topArtists = config.topArtists;
    
    return (
        <>
        <StyledTimeline>
            
            {playlistNames.map((playlistName) => {
                const videos = props.playlists[playlistName];
                let numberOfVideos = 0;
                return (
                    <section key={playlistName}>
                        <h2>{playlistName}</h2>
                        <div className="playlists">
                            {videos.filter((video) => {
                                const titleNormalized = video.title.toLowerCase();
                                if (searchValue){
                                    const searchValueNormalized = searchValue.toLowerCase();
                                    return titleNormalized.includes(searchValueNormalized)
                                }
                                else{
                                    return true;
                                }
                            })
                            .map((video) => {
                                {numberOfVideos += 1;}
                                return (
                                    <a key={video.url}  onClick={() => 
                                        {
                                            props.setVideoPlayerVisibility(true);
                                            props.setVideoPlaying({name: video.title, url: video.url, playlist: playlistName});
                                        }}>
                                        
                                        <img className="video-thumb" src={video.thumb} />
                                        <span className="video-title">
                                            {video.title}
                                        </span>
                                        <br></br>
                                    </a>
                                )
                            })
                            }
                            
                        </div>
                        {isPlaylistEmpty(numberOfVideos, searchValue)}
                    </section>
                )
                
            })}
        
            <section>
                <h2>Your Most-streamed Artists</h2>
                <div className="most-streamed-artists">
                {topArtists.map((artist) => {
                    return(
                        <a href={artist.url} key={artist.url}>
                            <img className="artist-thumb"src={artist.thumb}/>
                            <span>
                                {artist.name}
                            </span>
                        </a>
                    )
                })}
                </div>
            </section>
        </StyledTimeline>
        </>
    )
}

export default Timeline;