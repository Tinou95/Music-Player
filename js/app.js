document.addEventListener("DOMContentLoaded", () => {

  const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');
    const muteBtn = document.getElementById('mute');
    const volumeSlider = document.getElementById('volume-slider');
    const shuffleBtn = document.getElementById('shuffle');
    container = document.getElementsByClassName('container');
    const clic_souris = new Audio('asset/clic_souris.mp3');
    let lastVolume = 1;


  //Apparition container avec gsap lors du clique sur le bouton next ou prev
  nextBtn.addEventListener('click', () => {
    gsap.fromTo(image, {scale: 1}, {scale: 1.2, duration: 0.5, ease: "power2.inOut", yoyo: true, repeat: 1});
    gsap.fromTo(container, {opacity: 0, y: 50}, {opacity: 1, y: 0, duration: 1});
    gsap.fromTo(container, {y: -100}, {y: 0, duration: 1, ease: "bounce.out"});
    //et jouer le son clic_souris.mp3
  
    clic_souris.play();
  });
  prevBtn.addEventListener('click', () => {

    gsap.fromTo(image, {scale: 1}, {scale: 1.2, duration: 0.5, ease: "power2.inOut", yoyo: true, repeat: 1});
    gsap.fromTo(container, {opacity: 0, y: 50}, {opacity: 1, y: 0, duration: 1});
    gsap.fromTo(container, {y: -100}, {y: 0, duration: 1, ease: "bounce.out"});
    //et jouer le son clic_souris.mp3
    clic_souris.play();

  });


    //volume
    

    volumeSlider.addEventListener('input', function(e) {
        const volume = e.target.value;
        music.volume = volume;
    });

    //mute

    
    const leMute = muteBtn.addEventListener('click',  () => {

      clic_souris.play();
        muteBtn.classList.toggle('active');
        if (muteBtn.classList.contains('active')) {
            music.volume = 0;
            volumeSlider.value = 0;
        } else {
            music.volume = lastVolume;
            volumeSlider.value = lastVolume;
        }
    });

//pourvoir changer de musique avec les touches du clavier
document.addEventListener('keydown', (e) => {
    if (e.keyCode === 32) {
        togglePlay();
    }
    if (e.keyCode === 37) {
        changeMusic(-1);
    }
    if (e.keyCode === 39) {
        changeMusic(1);
    } 
    //et mute avec la touche m
    if (e.keyCode === 77) {
        leMute();
    }
});

//quand on fait mollette vers le haut ou le bas le volume change et on peut le voir sur la barre de progression
document.addEventListener('wheel', (e) => {
    if (e.deltaY < 0) {
        if (music.volume < 1) music.volume += 0.1;
    } else {
        if (music.volume > 0) music.volume -= 0.1;
    }
    volumeSlider.value = music.volume;
});

const music = new Audio();

const songs = [

    {
        path: 'asset/4.mp3',
        displayName: 'Lean on',
        cover: 'asset/4.jpg',
        artist: 'Dj Snake',
    },
    {
        path: 'asset/5.mp3',
        displayName: 'Au DD',
        cover: 'asset/5.jpg',
        artist: 'PNL',
    },
    {
        path: 'asset/1.mp3',
        displayName: 'The Charmer\'s Call',
        cover: 'asset/1.jpg',
        artist: 'Hanu Dixit',
    },
    {
        path: 'asset/3.mp3',
        displayName: 'Intellect',
        cover: 'asset/3.jpg',
        artist: 'Yung Logos',
    },
    {
        path: 'asset/6.mp3',
        displayName: 'No Limit',
        cover: 'asset/6.jpg',
        artist: 'Gazo',
    },
    {
        path: 'asset/7.mp3',
        displayName: 'Lose Yourself',
        cover: 'asset/7.png',
        artist: 'Eminem',
    },
    {
        path: 'asset/8.mp3',
        displayName: 'Egerie',
        cover: 'asset/8.jpg',
        artist: 'Nekfeu',
    },

];

//quand on clique sur une photo elle se met en fond d'écran avec un blur et la musique se lance
image.addEventListener('click', () => {
    const isPlaying = music.paused;
    if (isPlaying) {
        playMusic();
    } else {
        pauseMusic();
    }
});



let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
  //jouer clic_souris.mp3
    clic_souris.play();
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
  //jouer coup_poing.mp3
    clic_souris.play();
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}



//pregress bar très poussé pour qu'elle bouge en fonction de la musique
function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        // Update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        // Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        // Delay switching duration Element to avoid NaN
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        // Calculate display for currentTime
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}






function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);

shuffleBtn.addEventListener('click', () => {
    //choisis musique aléatoire parmis la list "songs"
    let randomIndex = Math.floor(Math.random() * songs.length);
    musicIndex = randomIndex;
    loadMusic(songs[musicIndex]);
    playMusic();

    //change le bouton shuffle
    shuffleBtn.classList.toggle('active');
    if (shuffleBtn.classList.contains('active')) {
        shuffleBtn.setAttribute('title', 'Shuffle On');
    }
    else {
        shuffleBtn.setAttribute('title', 'Shuffle Off');
    }
  });

  });
  