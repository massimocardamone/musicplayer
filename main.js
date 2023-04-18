let tracks = [
    {'url': './song/song-1.mp3.mp3', 'cover': './cover/cover-1.jpeg', 'artist': 'Boonekamp', 'title': 'J. Lux (Ragazza Silenziosa)'},
    {'url': './song/song-2.mp3.mp3', 'cover': './cover/cover-2.jpeg', 'artist': 'Uncle Deaf', 'title': 'Solo quel che voglio'},
    {'url': './song/song-3.mp3.mp3', 'cover': './cover/cover-3.jpeg', 'artist': 'ALTEA', 'title': 'Amici Amici'},
]

let wrapper = document.querySelector('#wrapper');
let audio = null;
let counterTrack = 0;
function mapRangeValue(x, in_min, in_max, out_min, out_max) {
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}


function createCover() {
wrapper.innerHTML = '';

let div = document.createElement('div');
div.classList.add('col-12', 'col-md-3', 'col-lg-5', 'd-flex', 'justify-content-center');
div.innerHTML = `
<!-- Immagine COVER -->
<img class="img-rounded" src="${tracks[counterTrack].cover}" alt="">
<!-- File AUDIO -->
<audio preload="metadata">
    <source src="${tracks[counterTrack].url}" type="audio/mpeg">
</audio>
`;
wrapper.appendChild(div);
audio = document.querySelector('audio');
}


function createInfoTrack() {
    let div = document.createElement('div');
    div.classList.add('col-12', 'col-md-5', 'col-lg-6');
    div.innerHTML = `
    <h2 class="text-center mt-5 mb-2">${tracks[counterTrack].title}</h2>
    <h3 class="text-center mb-5">${tracks[counterTrack].artist}</h3>
    <!-- Progress Bar -->
    <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
        <div class="progress-bar" style="width: 0%"></div>
    </div>
    <!-- Tempo Inizio e Fine -->
    <div class="d-flex justify-content-between">
        <p id="start">0:00</p>
        <p id="end"></p>
    </div>
    <!-- Sezione Pulsanti AUDIO -->
    <div class="d-flex justify-content-between">
        <button id="btnBackward" class="btn border fs-3"><i class="fa-solid fa-backward"></i></button>
        <button id="btnPlay" class="btn border fs-3"><i class="fa-solid fa-play"></i></button>
        <button id="btnForward" class="btn border fs-3"><i class="fa-solid fa-forward"></i></button>
    </div>
`;
wrapper.appendChild(div);

let btnBackward = document.querySelector('#btnBackward');
    let btnPlay = document.querySelector('#btnPlay');
    let btnForward = document.querySelector('#btnForward');

    btnPlay.addEventListener('click', () => {
        let imgRounded = document.querySelector('.img-rounded');
        if (audio.paused) {
            audio.play();
            btnPlay.innerHTML = '<i class="fa-solid fa-pause"></i>';
            imgRounded.style.animation = `rotateCover 2s infinite linear both`;
        } else {
            audio.pause();
            btnPlay.innerHTML = '<i class="fa-solid fa-play"></i>';
            imgRounded.style.animation = `rotateCover 2s infinite linear both paused`;
        }
    }) 
    btnForward.addEventListener('click', () => {

        if(counterTrack < tracks.length - 1) {
            counterTrack++;
        } else {
            counterTrack = 0;
        }
        createCover();
        createInfoTrack();
    })

    btnBackward.addEventListener('click', () => {
        if (counterTrack > 0) {
            counterTrack--;
        } else {
            counterTrack = tracks.length - 1;
        }
        createCover();
        createInfoTrack();
    
})

let end = document.querySelector('#end');
audio.addEventListener('loadedmetadata', () => {
end.innerHTML = (audio.duration / 60).toFixed(2);
let start = document.querySelector('#start');
})

audio.addEventListener('timeupdate', () => {
    let minutes = (audio.currentTime / 60).toFixed(2);
    start.innerHTML = minutes;
    let progressBar = document.querySelector('.progress-bar');
    progressBar.style.width = `${mapRangeValue(audio.currentTime, 0, audio.duration, 0, 100)}%`
    
})



}









createCover(); 
createInfoTrack();
