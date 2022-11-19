import React from "react";
import {getVideoId} from "../Helpers";
import { StyledVideoPlayer } from "./styles";


const VideoPlayer = (props) => {
    const videoID = getVideoId(props.videoPlaying.url);
    return(
        <StyledVideoPlayer>
             {props.videoPlayerVisibility ? (
                <div className="videoPlayer">
                    <div>
                        <h2>{props.videoPlaying.name}</h2>
                        <br/>
                        <iframe max-width="853" height="505" src={`https://www.youtube.com/embed/${videoID}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
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