import React, { useEffect } from "react";
import config from "../config.json";
import Menu from "../src/components/Menu";
import { createClient } from "@supabase/supabase-js";
import { videoService } from "../src/services/videoService";
import VideoPlayer from "../src/components/VideoPlayer";
import Header from "../src/components/Header";
import Timeline from "../src/components/Timeline";


function HomePage() {
    const service = videoService();
    const [searchValue, setSearchValue] = React.useState("");
    const [playlists, setplaylists] = React.useState({});
    const [videoPlayerVisibility, setVideoPlayerVisibility] = React.useState(false);
    const [videoPlaying, setVideoPlaying] = React.useState({name: "videoName", url: "https://www.youtube.com/watch?v=video_id"});

    React.useEffect(() => {
        service
            .getAllVideos()
            .then((resp) => {
                const newPlaylists = {...playlists};
                resp.data.forEach((video) => {
                    if(!newPlaylists[video.playlist]){
                        newPlaylists[video.playlist] = [];
                    }
                    newPlaylists[video.playlist].push(video);
                })
                setplaylists(playlists);
            });
        
    }, [])    

    return (
        <>
        <div>
            <Menu searchValue={searchValue} setSearchValue={setSearchValue}/>
            <Header banner={config.banner}/>
            <Timeline searchValue={searchValue} playlists={config.playlists} artists={config.topArtists} videoPlayerVisibility={videoPlayerVisibility} setVideoPlayerVisibility={setVideoPlayerVisibility} setVideoPlaying={setVideoPlaying}/>
            <VideoPlayer videoPlayerVisibility={videoPlayerVisibility} setVideoPlayerVisibility={setVideoPlayerVisibility} videoPlaying={videoPlaying}/>
        </div>
        </>
    )
}

export default HomePage;








