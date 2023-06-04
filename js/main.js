// Video controls
let videoMedia = document.querySelector("video");
let seekControl = document.getElementById("videoSeek");
let currentTime = document.getElementById("currentTime");
let durationTime = document.getElementById("durationTime");
let videoPlayerContainer = document.getElementById("playerFrame");;

// Playback controls
let prevBtn = document.getElementById("prev");
let pausePlayBtn = document.getElementById("pausePlay");
let nextBtn = document.getElementById("next");
let stopBtn = document.getElementById("stop");

// Media controls
let fullScreenBtn = document.getElementById("fullscreen");
let muteUnmuteBtn = document.getElementById("muteUnmute");
let volControl = document.getElementById("volume");


pausePlayBtn.addEventListener("click", pausePlayMedia);
seekControl.addEventListener("change", seekVideo);
prevBtn.addEventListener("click", prevMedia);
nextBtn.addEventListener("click", nextMedia);
stopBtn.addEventListener("click", stopVideo);
playlistBtn.addEventListener("click", togglePlaylist);
fullScreenBtn.addEventListener("click", toggleFullScreen);
muteUnmuteBtn.addEventListener("click", toggleMute);
volControl.addEventListener("change", controlVolume);


// videoMedia.addEventListener("loadedmetadata", getVideoDuration);
videoMedia.addEventListener("timeupdate", updateVideoProgressTime);

// Play or pause the video
function pausePlayMedia() {
    if(videoMedia.paused || videoMedia.ended) {
        videoMedia.play();
        pausePlayBtn.innerHTML = "pause";
    } else {
        videoMedia.pause();
        pausePlayBtn.innerHTML = "play";
    }
}

// toggle mute for the video
function toggleMute() {
    if(videoMedia.muted) {
        videoMedia.muted = false;
        // muteUnmuteBtn.innerHTML = "mute";
        
        // remove prev icon class before adding another
        muteUnmuteBtn.className = "fa fa-volume-up";
        volControl.value = 100;
    } else {
        videoMedia.muted = true;
        // muteUnmuteBtn.innerHTML = "unmute";
        // remove prev icon class before adding another
        muteUnmuteBtn.className = "fa fa-volume-off";
        volControl.value = 0;
    }
}

// stop the video playback
function stopVideo() {
    videoMedia.pause();
    videoMedia.currentTime = 0;
}

function seekVideo() {
    let seekTo = videoMedia.duration * (seekControl.value / 100);
    videoMedia.currentTime = seekTo;
}

function prevMedia() {

}

function nextMedia() {
    
}

function togglePlaylist() {

}

// Update time as the video plays
function updateVideoProgressTime() {
    let newTime = videoMedia.currentTime * (100 / videoMedia.duration);
    seekControl.value = newTime;

    let currentMins = Math.floor(videoMedia.currentTime / 60);
    let currentSecs = Math.floor(videoMedia.currentTime - currentMins * 60);
    let durationMins = Math.floor(videoMedia.duration / 60);
    let durationSecs = Math.floor(videoMedia.duration - durationMins * 60);

    if (currentSecs < 10) {
        currentSecs = "0"+currentMins; // refactor using ES6 templates 
    } 

    if (durationSecs < 10) {
        durationSecs = "0"+durationSecs; // refactor using ES6 templates 
    } 

    if (currentMins < 10) {
        currentMins = "0"+currentMins; // refactor using ES6 templates 
    } 

    if (durationMins < 10) {
        durationMins = "0"+durationMins; // refactor using ES6 templates 
    } 

    currentTime.innerHTML = currentMins+":"+currentSecs;
    durationTime.innerHTML = durationMins+":"+durationSecs;
}

// toggle fullscreen function
function toggleFullScreen() {
    if (document.fullscreenElement !== null) {
        // i.e the document is in fullscreen mode
        document.exitFullscreen();
        // setFullscreenData(false);
    } else {
        // i.e the document is not in fullscreen mode
        videoPlayerContainer.requestFullscreen();
        // setFullscreenData(true);
    }
}

function controlVolume() {
    // let currentVolume = Math.floor(videoMedia.volume * 10) / 10;
    // volControl.value = currentVolume;
    videoMedia.volume = volControl.value * 10 / 100;
}
