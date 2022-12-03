//Get youtube video ID
/*
export function getVideoId(url) {
    const videoId = url.split("v=")[1];
    if(!videoId)
        return "Error!";
    const ampersandPosition = videoId.indexOf("&")
    if (ampersandPosition !== -1){
        return videoId.substring(0, ampersandPosition);
    }
    return videoId;
}
*/

export function getVideoId(url) {
    var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if(url.match(p)){
        return url.match(p)[1];
    }
    return false;
}