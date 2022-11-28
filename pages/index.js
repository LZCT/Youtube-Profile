import React, { useEffect } from "react";
import config from "../config.json";
import Menu from "../src/components/Menu";
import VideoPlayer from "../src/components/VideoPlayer";
import Header from "../src/components/Header";
import Timeline from "../src/components/Timeline";
import RegisterVideo from "../src/components/RegisterVideo";


function HomePage() {
    // State with the value the user searched for
    const [searchValue, setSearchValue] = React.useState("");
    // State with the playlists
    const [playlists, setPlaylists] = React.useState({});
    // State to show video player modal
    const [videoPlayerVisibility, setVideoPlayerVisibility] = React.useState(false);
    // State to show register video modal
    const [formVisibility, setFormVisibility] = React.useState(false);
    // State with the video playing
    const [videoPlaying, setVideoPlaying] = React.useState({name: "", url: "https://www.youtube.com/watch?v=video_id", playlist: ""});
    
    //Get playlists from localStorage, if localStorage is not set, set localStorage with playlists from config.json
    React.useEffect(() => {
        const newPlaylists = JSON.parse(localStorage.getItem('playlists'));
        if(!newPlaylists)
            localStorage.setItem('playlists', JSON.stringify(config.playlists));
        if(playlists != newPlaylists)
            setPlaylists(newPlaylists);
    }, []);

    return (
        <>
        <div>
            <Menu searchValue={searchValue} setSearchValue={setSearchValue}/>
            <Header/>
            <Timeline searchValue={searchValue} playlists={playlists} videoPlayerVisibility={videoPlayerVisibility} setVideoPlayerVisibility={setVideoPlayerVisibility} setVideoPlaying={setVideoPlaying}/>
            <VideoPlayer videoPlayerVisibility={videoPlayerVisibility} setVideoPlayerVisibility={setVideoPlayerVisibility} videoPlaying={videoPlaying} playlists={playlists} setPlaylists={setPlaylists}/>
            <RegisterVideo playlists={playlists} formVisibility={formVisibility} setFormVisibility={setFormVisibility}/>
        </div>
        </>
    )
}

export default HomePage;








