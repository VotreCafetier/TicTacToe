const ChangeName = (e) => {
    const t = e.target;
    const nom_text = document.querySelector("#NameForm span");
    nom_text.innerText = t.value;
    if (t.value == "") {
        nom_text.innerText = t.placeholder;
    }
}

const SubmitName = () =>{
    const inputNom = document.querySelector("#NameForm input[type=text]");
    // if empty
    if (inputNom.value === ''){
        console.log('Veuillez entrer un nom');
        return;
    } 
    alert('Votre nom à changé ! Vous êtes maintenant : ' + inputNom.value)
}

const GetRndName = async () =>{
    try{
        let response = await fetch('https://api.namefake.com/');
        let data = await response.json();
        return data.name;
    } 
    catch (err){
        console.alert(err);
    }
}

(() => {
    const nom_text = document.querySelector("#NameForm span"),
        inputNom = document.querySelector("#NameForm input[type=text]"),
        btn_enter = document.querySelector("#NameForm button"),
        rnd_link = document.querySelector("#NameForm a");

    // set span to placeholder of input
    nom_text.innerText = inputNom.placeholder;

    // events
    inputNom.onkeydown = ChangeName;
    inputNom.onkeyup = ChangeName;
    inputNom.onkeypress = ChangeName;

    // submit btn
    btn_enter.onclick = SubmitName;

    // rnd btn
    rnd_link.onclick = async () => {
        let name = await GetRndName()
        inputNom.value = name;
        nom_text.innerText = name;
    };
})();
