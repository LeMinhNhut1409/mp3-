const song = document.getElementById("song");
const playBtn = document.querySelector(".player-inner");
const nextBtn = document.querySelector(".play-forward");
const prevBtn = document.querySelector(".play-back");
const durationTime = document.querySelector(".duration");
const remainingTime = document.querySelector(".remaining");
const rangeBar= document.querySelector(".range");
const musicName = document.querySelector(".music-name");
const musicArtist = document.querySelector(".artist");
const musicImage = document.querySelector(".music-thumb img");
const musicThumbnail = document.querySelector(".music-thumb");
const playRepeat = document.querySelector(".play-repeat");
/*const musicList = document.querySelector(".music-list");
const moreMusicBtn = document.querySelector("#list-sharp");
const closeMoreMusic= musicList.querySelector("#close");
let musicIndex = Math.floor((Math.random() * allMusic.length) + 1);*/
let isPlaying = true;
let indexSong = 0;
let isRepeat = false;

//const audios = ["ChuoiNgayVangEm-ChauKhaiPhong-3500633.mp3", "KhongTronVenNua-ChauKhaiPhongACV-7197914.mp3",
//"NgamHoaLeRoi-ChauKhaiPhong-4850041.mp3","Thuong-Em-Chau-Khai-Phong-ACV.mp3"];
const audios = [
    { 
        id: 1,
        title: "Duyên Phận",
        artist:"Hà Vân",
        file: "Duyên Phận.mp3",
        image: "image/Hàvan.jpeg"
    },
    { 
        id: 2,
        title: "Vùng Lá Me Bay",
        artist:"Dương Hồng Loan",
        file: "VungLaMeBay-DuongHongLoan-4796874.mp3",
        image: "image/hongloan.jpeg"
    },
    { 
        id: 3,
        title: "Khu Phố Ngày Xưa",
        artist:"Chế Minh",
        file: "KhuPhoNgayXua-CheMinh-5696359.mp3",
        image: "image/chếminh.jpeg"
    },
    { 
        id: 4,
        title: "Hoa Cài Mái Tóc",
        artist:"Hoài Lâm",
        file: "Hoa Cài Mái Tóc (Lofi Version).mp3",
        image: "image/hoailam.jpeg"
    },
    { 
        id: 5,
        title: "Cho Vừa Lòng Em",
        artist:"Đạt Long Vinh",
        file: "Cho Vừa Lòng Em (Lofi Version).mp3",
        image: "image/longvinh.jpeg"
    },
    { 
        id: 6,
        title: "Xin Em Đừng Khóc Vu Quy",
        artist:"Đan Phương",
        file: "Xin Em Đừng Khóc Vu Quy.mp3",
        image: "image/đanphuong.jpeg"
    },
    { 
        id: 7,
        title: "Chiều Trên Bản Thượng",
        artist:"Long Hoàng",
        file: "ChieuTrenBanThuong-LongHoang-7517225.mp3",
        image: "image/hoang.jpeg"
    },
    { 
        id: 8,
        title: "Xin Trả Tôi Về",
        artist:"Bảo Nguyên",
        file: "XinTraToiVe-BaoNguyen-7612614.mp3",
        image: "image/baonguyen.jpeg"
    }
]//danh sach nhac

let timer;
let repeatCount = 0;
//lặp lại bài hát
playRepeat.addEventListener("click", function () {
    if (isRepeat) {
    isRepeat = false;
    playRepeat.removeAttribute("style");
} else {
    isRepeat = true;
    playRepeat.style.color = "#ffb86c";
}
});
nextBtn.addEventListener("click", function(){
changeSong(1);
});
prevBtn.addEventListener("click", function(){
    changeSong(-1);
});
song.addEventListener("ended", handleEndedSong)
function handleEndedSong(){
    repeatCount++;
    if(isRepeat && repeatCount === 1)
    {
    //handle repeat song
    isPlaying = true;
    playPause();
    }
    else
    {
    changeSong(1);
    }
}
function changeSong(dir){
    if(dir === 1)
    {
        //next song
        indexSong++;
        if(indexSong >= audios.length)
        {
            indexSong = 0;
        }
        isPlaying = true;
    }
    else if(dir === -1)
    {
        // prev song
        indexSong--;
        if(indexSong < 0)
        {
            indexSong = audios.length - 1;
        }
        isPlaying = true;
    } // thay doi nhac chuyen qua bai moi
init(indexSong)
//song.setAttribute("src", `./audio/${audios[indexSong].file}`);
playPause();
}
playBtn.addEventListener("click", playPause);
function playPause() {
    if(isPlaying){
        musicThumbnail.classList.add("is-playing");
        song.play();
        playBtn.innerHTML = '<ion-icon name="pause"></ion-icon>';
        isPlaying = false;
        timer = setInterval(displayTimer, 500);
    }
    else{
        musicThumbnail.classList.remove("is-playing");
        song.pause();
        playBtn.innerHTML = '<ion-icon name="play"></ion-icon>';
        isPlaying = true;
        clearInterval(timer);
    }
} //dung hoac phat nhac

function displayTimer(){
const {duration, currentTime} = song;
remainingTime.textContent = formatTimer(currentTime);
rangeBar.max = duration;
rangeBar.value = currentTime;
    if(!duration){
        durationTime.textContent = "00:00";
    } else{
        durationTime.textContent = formatTimer(duration);
    }
} // Thời gian nhạc phát
function formatTimer(number){
    const minutes = Math.floor(number / 60);
    const seconds = Math.floor(number - minutes * 60);
    return `${minutes < 10 ? '0' + minutes: minutes}:${seconds < 10 ? '0' + seconds:seconds}`;
}
rangeBar.addEventListener("change", handleChangeBar);
function handleChangeBar(){
    song.currentTime = rangeBar.value;
} // Kéo thanh điều chỉnh thời gian và nhạc
function init(indexSong)
{
    song.setAttribute("src", `./audio/${audios[indexSong].file}`);
    musicImage.setAttribute("src", audios[indexSong].image);
    musicName.textContent = audios[indexSong].title;
    musicArtist.textContent = audios[indexSong].artist;
}//thay doi nhac, hinh, ten bai hat
init(indexSong); 
displayTimer();
//danh sách nhac
