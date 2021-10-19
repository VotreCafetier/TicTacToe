export const endGameOverlay = (msg) => {
    return (
        `<div id="winning_fiesta">
            <div>
                <h1>${msg} !</h1>
                <div class="confetti"></div>
                <button>PLAY AGAIN</button>
            </div>
        </div>`
    );
}