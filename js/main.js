// Video controls
const el = function(selector) {
   return document.querySelector(selector);
}
const container = el(".container"), 
videoMedia = el("video"),
videoTimeline = el(".videoTimeline"), 
progressBar = el(".progressBar"), 
volBtn = el(".volume i"), 
volSlider = el(".volumeSlider"), 
currentVidTime = el(".currentTime"), 
videoDuration = el(".durationTime"), 
skipBackwardBtn = el(".skipBackward i"), 
skipForwardBtn = el(".skipForward i"), 
playPauseBtn = el(".playPause i"), 
stopBtn = el(".stop i"), 
playbackSpeedBtn = el(".playbackSpeed i"), 
speedOptions = el(".speedOptions"), 
pipBtn = el(".picInPic i"), 
fullscreenBtn = el(".fullscreen i");
let timer;

// hide controls when video is paused
const hideControls = function() {
    if(videoMedia.paused) return;
    timer = setTimeout(function () {
        container.classList.remove("showControls");
    }, 3000);
}
hideControls();

// show controls when mouse hovers on the video
container.addEventListener("mousemove", function() {
    container.classList.add("showControls");
    clearTimeout(timer);
    hideControls();
});


const formatTime = function(time) {
    let secs = Math.floor(time % 60),
    mins = Math.floor(time / 60) % 60,
    hours = Math.floor(time / 3600);

    secs = secs < 10 ? `0${secs}` : secs;
    mins = mins < 10 ? `0${mins}` : mins;
    hours = hours < 10 ? `0${hours}` : hours;

    if (hours == 0) {
        return `${mins}:${secs}`;
    }
    return `${hours}:${mins}:${secs}`;
}

videoTimeline.addEventListener("mousemove", function(e) {
    let timelineWidth = videoTimeline.clientWidth;
    let offsetX = e.offsetX;
    let percent = Math.floor((offsetX / timelineWidth) * videoMedia.duration);
    const progressTime = videoTimeline.querySelector("span");
    offsetX = offsetX < 20 ? 20: (offsetX > timelineWidth - 20) ? timelineWidth - 20 : offsetX;
    progressTime.style.left = `${offsetX}px`;
    progressTime.innerText = formatTime(percent);
});

videoTimeline.addEventListener("click", function(e) {
    let timelineWidth = videoTimeline.clientWidth;
    videoMedia.currentTime = (e.offsetX / timelineWidth) * videoMedia.duration;
});

videoMedia.addEventListener("timeupdate", function(e) {
    let {current, duration} = e.target;
    let percent = (this.currentTime / duration) * 100;
    progressBar.style.width = `${percent}%`;
    currentVidTime.innerText = formatTime(this.currentTime);
});

videoMedia.addEventListener("loadeddata", function() {
videoDuration.innerText = formatTime(this.duration);
});

const draggableProgressBar = function(e) {
    let timelineWidth = videoTimeline.clientWidth;
    progressBar.style.width = `${e.offsetX}px`;
    videoMedia.currentTime = (e.offsetX / timelineWidth) * videoMedia.duration;
    currentVidTime.innerText = formatTime(videoMedia.currentTime);
}

volBtn.addEventListener("click", function() {
    if (!volBtn.classList.contains("fa-volume-up")) {
        videoMedia.volume = 0.5;
        volBtn.classList.replace("fa-volume-off", "fa-volume-up");
    } else {
        videoMedia.volume = 0.0;
        volBtn.classList.replace("fa-volume-up", "fa-volume-off");
    }
    volSlider.value = videoMedia.volume;
});

speedOptions.querySelectorAll("li").forEach(function(option) {
    option.addEventListener("click", function() {
        videoMedia.playbackRate = option.dataset.speed;
        speedOptions.querySelector(".active").classList.remove("active");
        option.classList.add("active");
    }); 
});

fullscreenBtn.addEventListener("click", function() {
    container.classList.toggle("fullscreen");
    if (document.fullscreenElement) {
        fullscreenBtn.classList.replace("fa-compress", "fa-arrows-alt");
        return document.exitFullscreen();
    }
    fullscreenBtn.classList.replace("fa-arrows-alt", "fa-compress");
    container.requestFullScreen;
});


playbackSpeedBtn.addEventListener("click", function(){ speedOptions.classList.toggle("show") });

pipBtn.addEventListener("click", function() { videoMedia.requestPictureInPicture() });

skipBackwardBtn.addEventListener("click", function() { videoMedia.currentTime -=5 });

skipForwardBtn.addEventListener("click", function() { videoMedia.currentTime +=5 });

videoMedia.addEventListener("play", function() { playPauseBtn.classList.replace("fa-play", "fa-pause") });

videoMedia.addEventListener("pause", function() { playPauseBtn.classList.replace("fa-pause", "fa-play") });

playPauseBtn.addEventListener("click", function() { videoMedia.paused ? videoMedia.play() : videoMedia.pause() });

videoTimeline.addEventListener("mousedown", function() { videoTimeline.addEventListener("mousemove", draggableProgressBar) });

document.addEventListener("mouseup", function() { videoTimeline.removeEventListener("mousemove", draggableProgressBar) });

stopBtn.addEventListener("click", function() {
    videoMedia.pause();
    videoMedia.currentTime = 0;
});

