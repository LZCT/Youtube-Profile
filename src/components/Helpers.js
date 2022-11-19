//Get youtube video ID
export function getVideoId(url) {
    const videoId = url.split("v=")[1];
    const ampersandPosition = videoId.indexOf("&")
    if (ampersandPosition !== -1){
        return videoId.substring(0, ampersandPosition);
    }
    return videoId;
}