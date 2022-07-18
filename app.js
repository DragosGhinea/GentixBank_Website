const express = require('express');
const fs = require('fs');
const session = require('express-session')
const crypto = require('crypto');
var app = express();

function encrypt(text){
    let cipher = crypto.createCipheriv('aes128', 'klaoumkkfpyugonk', 'vectorvector1234')
    let crypted = cipher.update(text, 'utf8', 'hex') 
    crypted += cipher.final('hex') 
    return crypted;
}

app.use(session({
    secret: 'secretFoarteSecret', 
    resave: true, 
    saveUninitialized: false 
    }));

app.set('view engine', 'ejs');
app.use(express.static('resurse'));

app.listen(5050, () => {
    console.log('Aplicatie pornita!');
});

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

const intrebari_frecvente = [
    "Inregistrarea unui cont costă?",
    "Cum se folosesc cardurile virtuale?",
    "Comandarea unui card fizic costă?",
    "Transferul de bani costă?",
    "Cum folosesc un cont de business?",
    "Pot face transferuri internaționale?"
]

const raspunsuri_frecvente = [
    "Nu, niciun cont nu costă să fie creat.",
    "Cardurile virtuale funcționează ca orice alt card, doar că nu îl poți folosi fizic. Perfect pentru tranzacții online!",
    "Cardul propriu zis nu! Dar taxe pentru transport pot fi percepute.",
    "Dacă banii sunt transferați unui alt utilizator Gentix, acesta nu costă nimic. În caz contrar, o taxă va fi perceputa conform precizărilor contului.",
    "Un cont de business are un administrator principal dar poate avea mai mulți utilizatori atașat la el.",
    "Da! Fiind o companie globalizată permitem transferuri internaționale cu un cost minim."
]

app.get('/faq', (req, res) => {
    res.render('faq', {intrebari_frecvente: intrebari_frecvente, raspunsuri_frecvente: raspunsuri_frecvente});
});

app.use('/logare', express.urlencoded({extended:true}));
app.post('/logare', (req, res) => {
    let utilizatori={};
    if (fs.existsSync("utilizatori.json")){
        var date= fs.readFileSync("utilizatori.json");
        utilizatori=JSON.parse(date);
    }else
        utilizatori={};

    if(req.body.email == undefined){
        if(utilizatori[req.body.username] != undefined && encrypt(req.body.pass) == utilizatori[req.body.username].parola){
            
            //sesiune start
            req.session.user=utilizatori[req.body.username];
            req.session.user['parola']=undefined;
            req.session.user['username']=req.body.username;
            return res.redirect('/');
        }
        res.redirect('autentificare.html');
    }
    else{
        if(utilizatori[req.body.username]!=undefined){
            return res.redirect('autentificare.html');
        }
        let utilizator = {'parola':encrypt(req.body.pass),'nume':req.body.nume,'prenume':req.body.prenume,'email':req.body.email};
        utilizatori[req.body.username]=utilizator;
        fs.writeFileSync("utilizatori.json", JSON.stringify(utilizatori));

        return res.redirect('autentificare.html');
    }
});

app.get('/api/sesiune', (req, res) => {
    if(req.session.user==undefined)
        res.send("undefined");
    else
        res.send(req.session.user);
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
})


app.use((req, res) =>{
    res.status(404).sendFile(__dirname + '/resurse/error404.html');
})