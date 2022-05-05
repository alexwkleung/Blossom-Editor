//credit: https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
function toggleFullScreen() {
    if(!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
      if(document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
}