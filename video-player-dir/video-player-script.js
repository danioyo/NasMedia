window.addEventListener("DOMContentLoaded",()=>{
    const fileName = new URLSearchParams(window.location.search).get('file');
    const videoPlayer = document.querySelector("#videoPlayer");
    videoPlayer.src = `/api/stream?file=${encodeURIComponent(fileName)}`;

})
