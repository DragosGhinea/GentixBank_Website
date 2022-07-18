window.onload = e => {
    let containerPoze = document.getElementById("container-sedii");
    
    var httpRequest = new XMLHttpRequest();


    httpRequest.open('GET', "http://localhost:5050/sedii.json");

    httpRequest.onreadystatechange=() => {
        if (httpRequest.readyState == 4) {
            if (httpRequest.status == 200){
                imagini = JSON.parse(httpRequest.responseText);
                
                
                let loading = setInterval(loadSediu, 1000);
                setTimeout(clearInterval, 6000, loading);

                containerPoze.addEventListener('click', schimbaCuloarea);

                setTimeout(() => {
                    for(let img of document.querySelectorAll("#container-sedii img")){
                        img.addEventListener('click', toggleTransparent)
                    }
                }, 6200);
            }
        }
    };

    httpRequest.send(null);
};

function toggleTransparent(event){
    event.stopPropagation();
    if(event.target.style.opacity!="0")
        event.target.style.opacity="0";
    else
        event.target.style.opacity="100";
}

function schimbaCuloarea(event){
    event.currentTarget.style.backgroundColor=culori[Math.floor(Math.random()*culori.length)];
}

let culori=[
    "red",
    "blue",
    "yellow",
    "lightblue",
    "green",
    "lightgreen"
]

let index=0;

var imagini;



function loadSediu(){
    let sedii = document.getElementById("container-sedii");
    let figura = document.createElement("figure");
    let img = document.createElement("img");
    img.src="imagini/"+imagini[index].src;
    let caption = document.createElement("figurecaption");
    caption.innerText = imagini[index].caption;
    figura.appendChild(img);
    figura.appendChild(caption);
    sedii.appendChild(figura);
    index++;
}