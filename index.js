const music_list = [
    {
        img: 'Paro nej.jpg',
        name: 'Maidaan Fateh',
        artist: 'Shreya Ghoshal, Sukhwinder Singh',
        music: 'Paro Nej 128 Kbps.mp3'
    },
    {
        img: 'unstoppable.jpg',
        name: 'Unstoppable',
        artist: 'Sia',
        music: 'unstoppable.mp3'
    },
    {
        img: 'GoDownDeh.jpg',
        name: 'Go Down Deh',
        artist: 'Shaan, Swanand Kirkire',
        music: 'Go Down Deh Spice 128 Kbps.mp3'
    },
    {
        img: 'LittleSecret.jpg',
        name: 'Dirty Little Secret',
        artist: 'Zack Knight, Nora Fatehi',
        music: 'Dirty Little Secret Zack Knight 128 Kbps.mp3'
    },
    {
        img: 'believer song.jpg',
        name: 'Believer - Imagine Dragon',
        artist: 'Jessy',
        music: 'believersong.mp3'
    }
];
let track_index = 0;
let isPlaying = false;
let updateTimer;
const curr_track = document.createElement('audio');
const playpause_btn = document.getElementById('play');
const next_btn = document.getElementById('next');
const prev_btn = document.getElementById('preplay');
const seek_slider = document.querySelector('.seek_slider');
const volume_slider = document.querySelector('.volume_slider');
const curr_time = document.querySelector('.current-time');
const total_duration = document.querySelector('.total-duration');
const song_name = document.getElementById('songname');
const artist_name = document.getElementById('artist');
const track_image = document.getElementById('image');

// Load the first track in the list
loadTrack(track_index)
// Playlist toggle functionality

function loadTrack(index) {
    clearInterval(updateTimer);
    resetValues();

    // Load the selected track
    curr_track.src = music_list[index].music;
    curr_track.load();
    track_image.src = music_list[index].img;
    song_name.textContent = music_list[index].name;
    artist_name.textContent = music_list[index].artist;
    updateTimer = setInterval(seekUpdate, 1000);
    curr_track.addEventListener('ended', nextTrack);
}

function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
    seek_slider.style.backgroundImage = 'linear-gradient(to right, #6c63ff, #6c63ff)';
    volume_slider.value = 99;
    volume_slider.style.backgroundImage = 'linear-gradient(to right, #34d399, #34d399)';
}

function playpauseTrack() {
    if (!isPlaying) playTrack();
    else pauseTrack();
}

function playTrack() {
    curr_track.play();
    isPlaying = true;
    playpause_btn.src = "pause-button2.png";
}

function pauseTrack() {
    curr_track.pause();
    isPlaying = false;
    playpause_btn.src = "play-button.png"; 
}

function nextTrack() {
    if (track_index < music_list.length - 1)
        track_index += 1;
    else track_index = 0;
    loadTrack(track_index);
    playTrack();
}

function prevTrack() {
    if (track_index > 0)
        track_index -= 1;
    else track_index = music_list.length - 1;
    loadTrack(track_index);
    playTrack();
}

function seekTo() {
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}

function setVolume() {
    curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
    let seekPosition = 0;

    if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;
        seek_slider.style.backgroundImage = `linear-gradient(to right, #6c63ff ${seekPosition}%, #d1d1d1 ${seekPosition}%)`;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}

playpause_btn.addEventListener('click', playpauseTrack);
next_btn.addEventListener('click', nextTrack);
prev_btn.addEventListener('click', prevTrack);

const playlistItems = document.querySelectorAll('.playlist-item');

playlistItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        track_index = index;
        loadTrack(track_index);
        playTrack();
    });
});
seek_slider.addEventListener('input', function() {
    const value = (seek_slider.value - seek_slider.min) / (seek_slider.max - seek_slider.min) * 100;
    seek_slider.style.backgroundImage = `linear-gradient(to right, #6c63ff ${value}%, #d1d1d1 ${value}%)`;
});

volume_slider.addEventListener('input', function() {
    const value = (volume_slider.value - volume_slider.min) / (volume_slider.max - volume_slider.min) * 100;
    volume_slider.style.backgroundImage = `linear-gradient(to right, #34d399 ${value}%, #d1d1d1 ${value}%)`;
});
const playlistToggleBtn = document.querySelector('.playlist-toggle button');
const playlistSection = document.querySelector('.playlist-section');

playlistToggleBtn.addEventListener('click', () => {
    playlistSection.classList.toggle('show');
});
