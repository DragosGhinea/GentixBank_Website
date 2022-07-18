window.onload = e => {
    if(!isNaN(localStorage.getItem("headerBackground")) && localStorage.getItem("headerBackground")!=null){
        i=parseInt(localStorage.getItem("headerBackground"));
    }
    schimbaBackgroundHeader();
    setInterval(schimbaBackgroundHeader, 3000);
}

let i=1;

function schimbaBackgroundHeader(){
    let header = document.getElementById("coperta");
    header.style.backgroundImage = "url('imagini/background-coperta"+i+".jpg')";

    let subtitlu=document.getElementById("subtitlu-coperta");
    switch(i){
        case 1:
            subtitlu.innerText="Folosește-ți banii eficient online.";
            break;
        case 2:
            subtitlu.innerText="Servicii în toată lumea.";
            break;
        case 3:
            subtitlu.innerText="Imun la fluctuații de valută.";
    }
    localStorage.setItem("headerBackground", i);
    i++;
    if(i==4)
        i=1;
}