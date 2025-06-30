const SearchBtn = document.querySelector(".Header-searchbox__IMG");
const SearchInput = document.querySelector(".Header-searchbox__input");
const SignLog = document.querySelector(".Header-SignLog");
SearchBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    SearchInput.classList.toggle("active");
    SignLog.classList.toggle("active");
});
document.body.addEventListener("click", (e) => {
    if (
        !e.target.closest(".Header-searchbox__IMG") &&
        !e.target.closest(".Header-searchbox__input")
    ) {
        SearchInput.classList.remove("active");
        SignLog.classList.remove("active");
    }
});

const musicPlayer = {
    NEXT_SONG: 1,
    PREV_SONG: -1,
    PREV_RESET_TIME: 3,
    STORAGE_KEYS: {
        loop: "loopMode",
        shuffle: "shuffleMode",
    },

    //Các Element
    playlistContainer: document.querySelector(".song-list__main"),
    playToggleBtn: document.querySelector(".now-playing__btn--play"), // Nút play/pause chính
    currentSongTitle: document.querySelector(".now-playing__title"), // Hiển thị tên bài đang phát
    currentSongArtist: document.querySelector(".now-playing__artist"), // Hiển thị tên nghệ sĩ
    currentSongPicture: document.querySelector(".now-playing__image img"), // Hiển thị ảnh bài hát
    currentSongDuration: document.querySelector(".now-playing__time--duration"),
    currentSongCurrent: document.querySelector(".now-playing__time--current"),
    audioPlayer: document.querySelector(".audio-player"), // Element audio HTML5
    playIcon: document.querySelector(".play-icon"), // Icon play/pause
    prevBtn: document.querySelector(".now-playing__btn--backward-step"), // Nút bài trước
    nextBtn: document.querySelector(".now-playing__btn--forward-step"), // Nút bài kế tiếp
    loopBtn: document.querySelector(".now-playing__btn--repeat"), // Nút lặp lại
    shuffleBtn: document.querySelector(".now-playing__btn--shuffle"), // Nút phát ngẫu nhiên
    progressBar: document.querySelector(".progress-bar"), // Thanh tiến trình
    songCD: document.querySelector(".now-playing__image img"),
    volumeBtn: document.querySelector(".now-playing__volume"),
    volume: document.querySelector("#volume"),
    //

    songList: [
        {
            id: 1,
            filePath: "./songs/matketnoi.mp3",
            title: "Mất Kết Nối",
            album: "Dữ Liệu Quý",
            image: "./images/img-matketnoi.jpg",
            artist: "Dương Domic",
        },
        {
            id: 2,
            filePath: "./songs/chacaidoseve.mp3",
            title: "Chắc Ai Đó Sẽ Về",
            album: "Sky Decade",
            image: "./images/img-chacaidoseve.jpg",
            artist: "Sơn Tùng M-TP",
        },
        {
            id: 3,
            filePath: "./songs/amthambenem.mp3",
            title: "Âm Thầm Bên Em",
            album: "Sky Decade",
            image: "./images/img-amthambenem.jpg",
            artist: "Sơn Tùng M-TP",
        },
        {
            id: 4,
            filePath: "./songs/chungtacuahientai.mp3",
            title: "Chúng Ta Của Hiện Tại",
            album: "Sky Decade",
            image: "./images/img-chungtacuahientai.jpg",
            artist: "Sơn Tùng M-TP",
        },
        {
            id: 5,
            filePath: "./songs/conmuangangqua.mp3",
            title: "Cơn Mưa Ngang Qua",
            album: "Sky Decade",
            image: "./images/img-conmuangangqua.jpg",
            artist: "Sơn Tùng M-TP",
        },
        {
            id: 6,
            filePath: "./songs/DaDoan-PhanManhQuynh-7944444.mp3",
            title: "Đa Đoan",
            album: "CineLove",
            image: "./images/img-dadoan.jpg",
            artist: "Phan Mạnh Quỳnh",
        },
        {
            id: 7,
            filePath: "./songs/HenLanSauLiveAtSapShow-MAYDAYs-36947711 (1).mp3",
            title: "Hẹn Lần Sau",
            album: "Second Round",
            image: "./images/img-henlansau.jpg",
            artist: "MAYDAYs",
        },
        {
            id: 8,
            filePath: "./songs/MuonRoiMaSaoCon-SonTungMTP-7011803.mp3",
            title: "Muộn Rồi Mà Sao Còn",
            album: "SkyTour",
            image: "./images/img-muonroimasaocon.jpg",
            artist: "Sơn Tùng M-TP",
        },
        {
            id: 9,
            filePath: "./songs/NoiNayCoAnh-SonTungMTP-4772041.mp3",
            title: "Nơi Này Có Anh",
            album: "SkyTour",
            image: "./images/img-noinaycoanh.jpg",
            artist: "Sơn Tùng M-TP",
        },
        {
            id: 10,
            filePath: "./songs/DoiHanhPhucLayCoDon-SongLuan-7909559.mp3",
            title: "Đổi Hạnh Phúc Lấy Cô Đơn",
            album: "COEM",
            image: "./images/img-doihanhphuclaycodon.jpg",
            artist: "Song Luân",
        },
    ],

    // Trạng Thái Của Player
    currentIndex: 0,
    isPlaying: false,
    isLoopMode: false,
    isShuffleMode: false,
    isScroll: true,
    //
    start() {
        // this.loadPlayerState();
        this.renderPlaylist();
        this.setupCurrentSong();
        this.setupEventListeners();
    },

    localStorage() {
        this.isLoopMode =
            localStorage.getItem(this.STORAGE_KEYS.loop) === "true";
        this.isShuffleMode =
            localStorage.getItem(this.STORAGE_KEYS.shuffle) === "true";
    },

    setupEventListeners() {
        //Play , pause
        this.playToggleBtn.onclick = () => {
            this.togglePlayPause();
        };

        //Khi audio bắt đầu;
        this.audioPlayer.onplay = () => {
            this.isPlaying = true;
            //Đổi icon từ play sang pause
            this.playIcon.classList.remove("fa-play");
            this.playIcon.classList.add("fa-pause");
            this.songCD.classList.add("playing");
        };
        this.audioPlayer.onpause = () => {
            this.isPlaying = false;
            //Đổi icon từ pause sang play
            this.playIcon.classList.remove("fa-pause");
            this.playIcon.classList.add("fa-play");
            this.songCD.classList.remove("playing");
        };

        // Khi lùi bài trước
        this.prevBtn.onclick = () => {
            this.handleSongNavigation(this.PREV_SONG);
        };
        // Khi next bài kế tiếp
        this.nextBtn.onclick = () => {
            this.handleSongNavigation(this.NEXT_SONG);
        };

        //Khi lặp
        this.loopBtn.onclick = () => {
            this.isLoopMode = !this.isLoopMode;
            this.updateLoopButtonState();
            localStorage.setItem(this.STORAGE_KEYS.loop, this.isLoopMode);
        };

        //Khi shuffle
        this.shuffleBtn.onclick = () => {
            this.isShuffleMode = !this.isShuffleMode;
            this.updateShuffleButtonState();
            localStorage.setItem(this.STORAGE_KEYS.shuffle, this.isShuffleMode);
        };
        // Khi click vào cái loa.
        this.volumeBtn.onmouseup = () => {
            this.volume.hidden = false;
        };
        document.body.onmousedown = (event) => {
            if (event.target !== this.volume) {
                this.volume.hidden = true;
            }
        };
        this.volume.oninput = () => {
            const currentVolume = (this.volume.value * 1) / 100;
            this.audioPlayer.volume = currentVolume;
        };
        // Cập nhật thanh tiến trình theo audio
        this.audioPlayer.ontimeupdate = () => {
            // Không cập nhật tiến trình nếu đang kéo
            if (this.progressBar.seeking) return;
            const progressPercent =
                (this.audioPlayer.currentTime / this.audioPlayer.duration) *
                100;
            this.progressBar.value = progressPercent || 0;

            this.currentSongCurrent.textContent = this.handleTime();
        };

        // Khi user kéo thanh tiến trình
        this.progressBar.onmousedown = () => {
            this.progressBar.seeking = true;
        };

        // KHi user thả thanh tiến trình
        this.progressBar.onmouseup = () => {
            const target = +this.progressBar.value;
            const seekTime =
                (this.progressBar.value * this.audioPlayer.duration) / 100;

            // Cập nhật lại audio
            this.audioPlayer.currentTime = seekTime;
            this.currentSongCurrent.textContent = this.handleTime();

            this.progressBar.seeking = false;
        };
        // Cập nhật currentTime khi mình kéo để user dễ quan sát
        this.progressBar.oninput = () => {
            const seekTime =
                (this.progressBar.value * this.audioPlayer.duration) / 100;
            this.currentSongCurrent.textContent = this.handleTime(seekTime);
        };

        //Khi click vào bài hát sẽ chon bài đó
        this.playlistContainer.onclick = (e) => {
            const targetSong = e.target.closest(".song-row");
            if (targetSong) {
                this.currentIndex = targetSong.dataset.index - 1;
                this.isPlaying = true;
                this.handleNewSongIndex();
            }
            this.isScroll = false;
        };
        //Khi bài hát kết thúc
        this.audioPlayer.onended = () => {
            this.handleSongNavigation(this.NEXT_SONG);
        };
    },

    // Xử lý điều hướng bài hát (trước/sau)
    handleSongNavigation(direction) {
        // Luôn phát khi chuyển bài dù trước đó đang pause
        this.isPlaying = true;
        this.isScroll = true;
        const shouldResetCurrentSong =
            this.audioPlayer.currentTime > this.PREV_RESET_TIME;

        // Nếu nhấn nút "trước" và bài hát đã phát > 2 giây, thì reset về đầu bài thay vì chuyển bài
        if (direction === this.PREV_SONG && shouldResetCurrentSong) {
            this.audioPlayer.currentTime = 0;
            return;
        }

        // Xác định bài hát tiếp theo
        if (this.isShuffleMode) {
            // Nếu đang ở chế độ shuffle, chọn bài ngẫu nhiên
            this.currentIndex = this.getRandomSongIndex();
        } else {
            // Nếu không, chuyển theo thứ tự
            this.currentIndex += direction;
        }

        // Xử lý chỉ số và cập nhật player
        this.handleNewSongIndex();
    },

    // Tạo chỉ số ngẫu nhiên cho bài hát (không trùng với bài hiện tại)
    getRandomSongIndex() {
        // Nếu chỉ có <= 1 bài thì không cần random
        if (this.songList.length <= 1) {
            return this.currentIndex;
        }

        let randomIndex = null;
        // Tạo số ngẫu nhiên cho đến khi khác với bài hiện tại
        do {
            randomIndex = Math.floor(Math.random() * this.songList.length);
        } while (randomIndex === this.currentIndex);

        return randomIndex;
    },

    // Xử lý khi có chỉ số bài hát mới
    handleNewSongIndex() {
        // Đảm bảo chỉ số luôn trong phạm vi hợp lệ (0 đến length-1)
        // Sử dụng modulo để tạo vòng lặp: -1 -> length-1, length -> 0
        this.currentIndex =
            (this.currentIndex + this.songList.length) % this.songList.length;

        // Thiết lập bài hát mới và render lại playlist
        this.setupCurrentSong();
        this.renderPlaylist();
    },

    // Cập nhật trạng thái nút lặp lại
    updateLoopButtonState() {
        this.audioPlayer.loop = this.isLoopMode;
        this.loopBtn.classList.toggle("active", this.isLoopMode);
    },

    // Cập nhật trạng thái nút phát ngẫu nhiên
    updateShuffleButtonState() {
        this.shuffleBtn.classList.toggle("active", this.isShuffleMode);
    },
    // Thiết lập bài hát hiện tại (tải file, cập nhật tiêu đề, thiết lập trạng thái)
    setupCurrentSong() {
        const currentSong = this.getCurrentSong();
        // Cập nhật tiêu đề bài hát đang phát
        this.currentSongTitle.textContent = currentSong.title;
        this.currentSongArtist.textContent = currentSong.artist;
        this.currentSongPicture.src = currentSong.image;
        // Tải file audio
        this.audioPlayer.src = currentSong.filePath;
        // Cập nhật trạng thái các nút
        this.updateLoopButtonState();
        this.updateShuffleButtonState();
        // Sự kiện khi audio sẵn sàng phát
        this.audioPlayer.oncanplay = () => {
            // Cập nhật thời gian ở thanh progress

            const durationMin = String(
                this.getMinute(this.audioPlayer.duration)
            ).padStart(2, "0");
            const durationSec = String(
                this.getSecond(this.audioPlayer.duration)
            ).padStart(2, "0");
            this.currentSongDuration.textContent = `${durationMin}:${durationSec}`;
            this.currentSongCurrent.textContent = this.handleTime();

            // this.currentSongDuration.textContent =;
            // Chỉ tự động phát nếu đang trong trạng thái playing
            if (this.isPlaying) {
                this.audioPlayer.play();
            }
        };
        this.currentSongInPlaylist(currentSong.id);
    },
    handleTime(time = this.audioPlayer.currentTime) {
        const currentMin = String(this.getMinute(time)).padStart(2, "0");
        const currentSec = String(this.getSecond(time)).padStart(2, "0");
        return `${currentMin}:${currentSec}`;
    },
    // Lấy thông tin bài hát hiện tại
    getCurrentSong() {
        return this.songList[this.currentIndex];
    },

    // Toggle play/pause
    togglePlayPause() {
        if (this.audioPlayer.paused) {
            this.audioPlayer.play();
        } else {
            this.audioPlayer.pause();
        }
    },

    renderPlaylist() {
        this.playlistContainer.innerHTML = "";

        this.songList.forEach((song, index) => {
            const isCurrentSong = index === this.currentIndex;

            // Tạo phần tử HTML cho bài hát
            const li = document.createElement("li");
            li.className = `song-row ${isCurrentSong ? "active" : ""}`;
            li.dataset.index = song.id;
            li.innerHTML = `
            <div class="about-song">
                <span class="song-row__index">${song.id}</span>
                <div class="song-row__thumb">
                    <img src="${this.escapeHTML(song.image)}" alt="song" />
                </div>
                <div class="song-row__info">
                    <p class="song-row__title">${this.escapeHTML(
                        song.title
                    )}</p>
                    <p class="song-row__artist">${this.escapeHTML(
                        song.artist
                    )}</p>
                </div>
            </div>
            <div class="song-row__album">${this.escapeHTML(song.album)}</div>
            <div class="song-row__duration">--:--</div>
            <div class="song-row__options">
                <i class="fa-solid fa-ellipsis"></i>
            </div>
        `;

            // Chèn vào DOM
            this.playlistContainer.appendChild(li);

            // Sau khi render, lấy duration
            const durationElement = li.querySelector(".song-row__duration");
            this.getSongDuration(song.filePath, (duration) => {
                const min = String(this.getMinute(duration)).padStart(2, "0");
                const sec = String(this.getSecond(duration)).padStart(2, "0");
                durationElement.textContent = `${min}:${sec}`;
            });
        });
    },

    getMinute(time) {
        const minute = parseInt(time / 60);
        return minute;
    },
    getSecond(time) {
        const seconds = Math.ceil(time % 60);
        return seconds;
    },
    escapeHTML(html) {
        // Kiểm tra input có hợp lệ không
        if (typeof html !== "string") {
            return "";
        }

        // Tạo một temporary div element để sử dụng textContent
        // textContent tự động escape các ký tự đặc biệt
        const tempDiv = document.createElement("div");
        tempDiv.textContent = html;
        return tempDiv.innerHTML;
    },
    getSongDuration(filePath, callback) {
        const audio = document.createElement("audio");
        audio.src = filePath;
        audio.preload = "metadata";

        audio.addEventListener("loadedmetadata", () => {
            const duration = audio.duration;
            callback(duration);
        });

        audio.addEventListener("error", () => {
            callback(0); // nếu lỗi, gán 0
        });
    },
    currentSongInPlaylist(songId) {
        const targetRow = document.querySelector(
            `.song-row[data-index="${songId}"]`
        );
        const scrollContainer = document.querySelector(".song-list__main");
        if (targetRow && scrollContainer && this.isScroll) {
            targetRow.classList.add("active");
            scrollContainer.scrollTo({
                top: targetRow.offsetTop - scrollContainer.offsetTop,
                behavior: "smooth",
            });
        }
    },
};
musicPlayer.start();
