var voiceSelect = document.getElementById("voiceSelect");
var voices__, blobUrl;

function setVoice() {
    voices__ = window.speechSynthesis.getVoices();
    voiceSelect.innerHTML = "";
    voices__.forEach((voice, i) => {
        var option__ = document.createElement("option");
        option__.value = voice.name;
        option__.innerHTML = voice.name;
        if (i == 0) {
            option__.selected = true;
        }
        voiceSelect.appendChild(option__);
    });
}

window.speechSynthesis.onvoiceschanged = function() {
    setVoice();
};

function speaker(words, y) {
    if ('speechSynthesis' in window) {
        var utterance = new SpeechSynthesisUtterance(words);
        utterance.voice = voices__[voiceSelect.selectedIndex];
        utterance.rate = 1;
        if (y) {
            window.speechSynthesis.speak(utterance);
        } else{
            return new Promise(function(resolve, reject) {
                utterance.onend = function() {
                    var pcmData = lamewav.getBuffer();
                    var mp3encoder = new Mp3Encoder(1, 44100, 128);
                    var mp3Data = mp3encoder.encodeBuffer(pcmData);
                    var blob = new Blob([new Uint8Array(mp3Data)], { type: 'audio/mp3' });
                    blobUrl = URL.createObjectURL(blob);
                    resolve(blob);
                };
            });
        }
    } else {
        alert("Sorry, your browser doesn't support Text to Speech.");
    }
}

function downloadFile() {
    console.log(blobUrl)
    var link = document.createElement("a");
    link.href = blobUrl;
    link.download = "tts.mp3";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

var textarea = document.querySelector("textarea");
var submit = document.querySelector("#submit");
submit.addEventListener("click", function() {
    speaker(textarea.value, true);
});

var download = document.querySelector("#download");
download.addEventListener("click", function() {
    speaker(textarea.value, false).then(()=>{
        downloadFile();
    });
});

var arr = [
    '<a target="_blank" href="https://www.adnans.website/contact-me/index.html">'+
    '<i class="bi bi-envelope-paper"></i>'+
    '</a>',
    '<a target="_blank" href="https://www.instagram.com/adnanscode/">'+
        '<i class="bi bi-instagram"></i>'+
    '</a>',
    '<a target="_blank" href="https://github.com/adddeveloper">'+
        '<i class="bi bi-github"></i>'+
    '</a>',
    '<a target="_blank" href="https://www.youtube.com/channel/UCZ0GqtCuXYJ99XVY1aiyHOg">'+
        '<i class="bi bi-youtube"></i>'+
    '</a>',
    '<a target="_blank" href="https://twitter.com/adnanscode">'+
        '<i class="bi bi-twitter"></i>'+
    '</a>'
];
// navigation bar
var navbar_list = document.getElementById("navbar_list");
arr.forEach(e=>{
    navbar_list.innerHTML += '<li class="nav-item m-2">'
    navbar_list.innerHTML += e;
    navbar_list.innerHTML += '</li>'
});

// toggle darkmode
function lightmode(){
    document.body.classList.remove("bg-dark");
    document.querySelector("nav").classList.remove("bg-dark");
    document.querySelector("nav").classList.add("text-dark");
    document.querySelectorAll("a").forEach(e=>{
        e.style.color = "black";
    })
    document.querySelector("textarea").classList.add("text-dark");
    document.querySelector("textarea").classList.remove("text-light");
    document.querySelector("textarea").style.borderColor = "black";
}
function darkmode(){
    document.body.classList.add("bg-dark");
    document.querySelector("nav").classList.add("bg-dark");
    document.querySelector("nav").classList.remove("text-dark");
    document.querySelectorAll("a").forEach(e=>{
        e.style.color = "white";
    })
    document.querySelector("textarea").classList.remove("text-dark");
    document.querySelector("textarea").classList.add("text-light");
    document.querySelector("textarea").style.borderColor = "white";
}

var mode__ = true;
var switch_ = document.getElementById("switch");
switch_.addEventListener("click", ()=>{
    if(mode__){
        switch_.title = "dark mode";
        mode__ = false;
        switch_.innerHTML = 
        '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-toggle-on" viewBox="0 0 16 16">'+
            '<path d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10H5zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"/>'+
        '</svg>';
        lightmode();
    } else {
        switch_.title = "light mode";
        darkmode();
        mode__ = true;
        switch_.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-toggle-off" viewBox="0 0 16 16">'+
            '<path d="M11 4a4 4 0 0 1 0 8H8a4.992 4.992 0 0 0 2-4 4.992 4.992 0 0 0-2-4h3zm-6 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM0 8a5 5 0 0 0 5 5h6a5 5 0 0 0 0-10H5a5 5 0 0 0-5 5z"/>'+
        '</svg>';
    }
});