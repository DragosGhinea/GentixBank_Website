window.addEventListener('load', () => {
    let autentificare = document.querySelector("#header-autentificare a");
    
    var httpRequest = new XMLHttpRequest();


    httpRequest.open('GET', "http://localhost:5050/api/sesiune");

    httpRequest.onreadystatechange=() => {
        if (httpRequest.readyState == 4) {
            if (httpRequest.status == 200){
                if(httpRequest.responseText!='undefined'){
                    let data = JSON.parse(httpRequest.responseText);
                    autentificare.innerText=data.username+" ("+data.nume+" "+data.prenume+")";
                }
            }
        }
    };

    httpRequest.send();
});