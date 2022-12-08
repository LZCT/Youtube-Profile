import React from "react";
import {StyledTimeline, StyledTimelineComponents} from "./styles";
import config from "../../../config.json";
import VideoPlayer from "./components/VideoPlayer";
import RegisterVideo from "./components/RegisterVideo";
import PlaylistInfo from "./components/PlaylistInfo";

// Function to check if a playlist is empty
function isPlaylistEmpty(numberOfVideos, isSearch){
    if(numberOfVideos === 0){
        if(isSearch)
            return <h2 className="playlist-warning">There are no videos in this playlist that match your search!</h2>;
        return <h2 className="playlist-warning">This playlist is empty!</h2>;
    }   
}

// Function to check if the user has playlists
function areTherePaylists(playlists){
    if(playlists.length === 0)
        return (
            <section>
                <h2 className="playlist-warning">You don't have any playlists yet! Click the + in the corner of the screen to start adding playlists and videos!</h2>
            </section> 
        );
}

function Timeline({searchValue, ...props}) {

    // State with the playlists
    const [playlists, setPlaylists] = React.useState({});
    // State to show video player modal
    const [videoPlayerVisibility, setVideoPlayerVisibility] = React.useState(false);
    // State to show register video modal
    const [formVisibility, setFormVisibility] = React.useState(false);
    // State to show playlist info modal
    const [playlistInfo, setPlaylistInfo] = React.useState({name: "", numberOfVideos: 0, visibility: false});
    // State with the video playing
    const [videoPlaying, setVideoPlaying] = React.useState({name: "", url: "https://www.youtube.com/watch?v=video_id", playlist: ""});
    

     //Get playlists from localStorage, if localStorage is not set, set localStorage with playlists from config.json
     React.useEffect(() => {
        
        const newPlaylists = JSON.parse(localStorage.getItem('playlists'));
        if(!newPlaylists){
            localStorage.setItem('playlists', JSON.stringify(config.playlists));
            setPlaylists(config.playlists);
        }
        else{
            if(playlists != newPlaylists)
                setPlaylists(newPlaylists);
        }
    
    }, []);
    
    const playlistNames = Object.keys(playlists);
    const featureChannels = config.featureChannels;

    return (
        <>
        <StyledTimeline>
            
            {areTherePaylists(playlistNames)}
            {playlistNames.map((playlistName) => {
                const videos = playlists[playlistName];
                let numberOfVideos = 0;
                return (
                    <section key={playlistName}>
                        <h2><a key={playlistName}  onClick={() => {setPlaylistInfo({name: playlistName, numberOfVideos: numberOfVideos,  visibility: true})}}>{playlistName}</a></h2>
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
                                numberOfVideos+=1;
                                return (
                                    <a key={video.url}  onClick={() => 
                                        {
                                            setVideoPlayerVisibility(true);
                                            setVideoPlaying({name: video.title, url: video.url, playlist: playlistName});
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
                <h2>Other Channels</h2>
                <div className="feature-channels">
                {featureChannels.map((channel) => {
                    return(
                        <a href={channel.url} key={channel.url}>
                            <img className="channel-thumb"src={channel.thumb}/>
                            <span>
                                {channel.name}
                            </span>
                        </a>
                    )
                })}
                </div>
            </section>

        </StyledTimeline>

        <StyledTimelineComponents>
            <VideoPlayer videoPlayerVisibility={videoPlayerVisibility} setVideoPlayerVisibility={setVideoPlayerVisibility} videoPlaying={videoPlaying} playlists={playlists} setPlaylists={setPlaylists}/>
            <RegisterVideo playlists={playlists} formVisibility={formVisibility} setFormVisibility={setFormVisibility} setPlaylists={setPlaylists}/>
            <PlaylistInfo playlistInfo={playlistInfo} setPlaylistInfo={setPlaylistInfo} playlists={playlists} setPlaylists={setPlaylists}/>
        </StyledTimelineComponents>
        </>
    )
}

export default Timeline;