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
                <h1>CHANGE YOUR NAME</h1>
                <span></span>
                <div>
                    <input type="text" placeholder="Player 1"/>
                    <a>Random</a>
                    <button>Change</button>
                </div>
            </div>
        </div>`
    );
}

export const Loader = () => {
    return (
        `<div class="loader">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>`
    );
}