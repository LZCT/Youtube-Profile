import React from "react";
import {StyledTimeline} from "./styles";

function Timeline({searchValue, ...props}) {
    const playlistNames = Object.keys(props.playlists);
    const topArtists = props.artists;
    
    return (
        <>
        <StyledTimeline>
            {playlistNames.map((playlistName) => {
                const videos = props.playlists[playlistName];
                
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
                                return (
                                    <a key={video.url}  onClick={() => 
                                        {
                                            props.setVideoPlayerVisibility(true);
                                            props.setVideoPlaying({name: video.title, url: video.url});
                                        }}>
                                        
                                        <img className="video-thumb" src={video.thumb} />
                                        <span className="video-title">
                                            {video.title}
                                        </span>
                                        <br></br>
                                    </a>
                                )
                            })}
                        </div>
                    </section>
                )
            })}
        
            <section>
                <h2>Your Most-streamed Artists</h2>
                <div className="most-streamed-artists">
                {topArtists.map((artist) => {
                    return(
                        <a href={artist.url}>
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