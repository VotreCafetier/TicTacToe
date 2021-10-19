function ChangeName() {
    const nom_text = document.querySelector("#NomText");
    nom_text.innerText = this.value;
    if (this.value == "") {
        nom_text.innerText = this.placeholder;
    }
}

function SubmitName(){
    const inputNom = document.querySelector("#Nom");
    // if empty
    if (inputNom.value === ''){
        console.log('Veuillez entrer un nom');
        return;
    } 
    alert('Votre nom à changé ! Vous êtes maintenant : ' + inputNom.value)
}

async function GetRndName(){
    //Get https://api.namefake.com/
    try{
        let response = await fetch('https://api.namefake.com/');
        let data = await response.json();
        return data.name;
    } 
    catch (err){
        console.alert(err);
    }
}

// onload
(() => {
    const nom_text = document.querySelector("#NomText");
    const inputNom = document.querySelector("#Nom");
    const btn_enter = document.querySelector("#EnterForm button");
    const rnd_link = document.querySelector("#EnterForm a");

    // set span to placeholder of input
    nom_text.innerText = inputNom.placeholder;

    // events
    inputNom.onkeydown = ChangeName;
    inputNom.onkeyup = ChangeName;
    inputNom.onchange = ChangeName;

    // submit btn
    btn_enter.onclick = SubmitName;

    // rnd btn
    rnd_link.onclick = async () => {
        let name = await GetRndName()
        inputNom.value = name;
        nom_text.innerText = name;
    };
})();
