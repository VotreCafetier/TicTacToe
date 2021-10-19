export const endGameOverlay = (msg) => {
    return (
        `<div id="winning_fiesta" class="overlay">
            <div>
                <h1>${msg} !</h1>
                <div class="confetti"></div>
                <button>PLAY AGAIN</button>
            </div>
        </div>`
    );
}

export const NameOverlay = () => {
    return (
        `<div id="NameForm" class="overlay">
            <div>
                <h1>CHANGER VOTRE NOM</h1>
                <span></span>
                <div>
                    <input type="text" placeholder="Votre nom" id="Nom"/>
                    <a>Random</a>
                    <button>Changer</button>
                </div>
            </div>
        </div>`
    );
}