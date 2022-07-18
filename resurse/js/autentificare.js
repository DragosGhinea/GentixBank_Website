window.onload = e => {
    //genereazaFormLogare();

    let logare = document.getElementById("logare");
    logare.addEventListener('click', () => {
        if(clicked==1)
            submitForm();
        else
            genereazaFormLogare();
    });
    
    let inregistrare = document.getElementById("inregistrare");
    inregistrare.addEventListener('click', () => {
        if(clicked==2)
            submitForm();
        else
            genereazaFormInregistrare();
    });

    var httpRequest = new XMLHttpRequest();

    httpRequest.open('GET', "http://localhost:5050/api/sesiune");

    httpRequest.onreadystatechange=() => {
        if (httpRequest.readyState == 4) {
            if (httpRequest.status == 200){
                if(httpRequest.responseText!='undefined'){
                    let data = JSON.parse(httpRequest.responseText);
                    let parinte = logare.parentNode;
                    logare.remove();
                    inregistrare.remove();
                    let logout = document.createElement('button');
                    logout.id="logare";
                    logout.innerText="Deloghează-te";
                    logout.addEventListener('click', () => {
                        window.location.href='/logout';
                    });
                    parinte.appendChild(logout);
                }
            }
        }
    };

    httpRequest.send();
}

//0 - neselectat
//1 - logare
//2 - inregistrare
let clicked=0;

function submitForm(){
    let form = document.querySelector("form");
    form.requestSubmit();
}

function genereazaFormLogare(){
    clicked=1;
    let form = document.querySelector("form");

    while (form.firstChild) {
        form.removeChild(form.lastChild);
    }

    let usernameLabel = document.createElement("label");
    usernameLabel.innerText+="Username";
    let username = document.createElement("input");
    username.setAttribute("type", "text");
    username.setAttribute("required", "");
    username.id="username";
    username.name="username";
    username.classList.add("form-component-input");
    usernameLabel.appendChild(username);

    let passLabel = document.createElement("label");
    passLabel.innerText+="Parolă";
    let pass = document.createElement("input");
    pass.setAttribute("type", "password");
    pass.setAttribute("required", "");
    pass.id="pass";
    pass.name="pass";
    pass.classList.add("form-component-input");
    passLabel.appendChild(pass);

    form.appendChild(usernameLabel);
    form.appendChild(passLabel);
}

function genereazaFormInregistrare(){
    clicked=2;
    let form = document.querySelector("form");

    while (form.firstChild) {
        form.removeChild(form.lastChild);
    }

    let usernameLabel = document.createElement("label");
    usernameLabel.innerText+="Username";
    let username = document.createElement("input");
    username.setAttribute("type", "text");
    username.setAttribute("required", "");
    username.id="username";
    username.name="username";
    username.classList.add("form-component-input");
    usernameLabel.appendChild(username);

    let passLabel = document.createElement("label");
    passLabel.innerText+="Parolă";
    let pass = document.createElement("input");
    pass.setAttribute("type", "password");
    pass.setAttribute("required", "");
    pass.id="pass";
    pass.name="pass";
    pass.classList.add("form-component-input");
    passLabel.appendChild(pass);

    let numeLabel = document.createElement("label");
    numeLabel.innerText+="Nume";
    let nume = document.createElement("input");
    nume.setAttribute("type", "text");
    nume.setAttribute("required", "");
    nume.id="nume";
    nume.name="nume";
    nume.classList.add("form-component-input");
    numeLabel.appendChild(nume);

    let prenumeLabel = document.createElement("label");
    prenumeLabel.innerText+="Prenume";
    let prenume = document.createElement("input");
    prenume.setAttribute("type", "text");
    prenume.setAttribute("required", "");
    prenume.id="prenume";
    prenume.name="prenume";
    prenume.classList.add("form-component-input");
    prenumeLabel.appendChild(prenume);

    let emailLabel = document.createElement("label");
    emailLabel.innerText+="Email";
    let email = document.createElement("input");
    email.setAttribute("type", "email");
    email.setAttribute("required", "");
    email.id="email";
    email.name="email";
    email.classList.add("form-component-input");
    emailLabel.appendChild(email);

    form.appendChild(usernameLabel);
    form.appendChild(passLabel);
    form.appendChild(numeLabel);
    form.appendChild(prenumeLabel);
    form.appendChild(emailLabel);
}