let player = ['Player 1', 'Player 2'];
let board = [
    null, null, null, // 0 1 2
    null, null, null, // 3 4 5
    null, null, null  // 6 7 8
];
let round = 1;
const winner_comb = {
    'First Row': [1,1,1,0,0,0,0,0,0],
    'Second Row': [0,0,0,1,1,1,0,0,0],
    'Third Row': [0,0,0,0,0,0,1,1,1],
    'First Col': [1,0,0,1,0,0,1,0,0],
    'Second Col': [0,1,0,0,1,0,0,1,0],
    'Third Col': [0,0,1,0,0,1,0,0,1],
    'Diagonal Left': [1,0,0,0,1,0,0,0,1],
    'Diagonal Right': [0,0,1,0,1,0,1,0,0]
};

function isWinner(r){
    // Verify if winner
    for (const [key, value] of Object.entries(winner_comb)) {
        // convert to board to temp (convert null to 0 and 1 to all player)
        let temp = [];
        for (let i = 0; i < board.length; i++) {
            board[i] === r?temp.push(1):temp.push(0);
            if (temp[i] !== value[i] && temp[i] === 1)temp[i] = 0;
        }

        for (let i = 0; i < temp.length; i++) {
            if (temp[i] !== value[i]) break;
            if (i === (temp.length-1)) return true;
        }
    }

    // verifiy if draw
    for (let i = 0; i < board.length; i++) {
        if (board[i] === null) break;
        if (i === (board.length-1)) return "Draw";
    }

    return false;
}

function Reset(){
    // reset board
    for (let i = 0; i < board.length; i++) {
        board[i] = null;
    }

    // reset player
    player = ['Player 1', 'Player 2'];

    // Reset round
    round = 1;

    // assign play on click on table
    const cells = document.querySelectorAll("#tictactoe > div");
    for (let i = 0; i < cells.length; i++) {
        cells[i].onclick = (e) => Play(e.target, i);
        cells[i].onmouseover = handleHover;
        cells[i].onmouseout = handleHoverOut;
    }
}

const handleHover = e => {
    const target = e.target;
    if(target.className === 'played') return;
    // render x for 1 && o for 2
    if(round === 1){
        target.innerHTML = `<img src="img/X.svg" alt="X" />`;
    }
    else{
        target.innerHTML = `<img src="img/O.svg" alt="O" />`;
    }
}

const handleHoverOut = e => {
    target = e.target;
    if(target.className !== 'played')target.innerHTML = '';
}

const handleReset = e => {
    Reset();
    //close overlay
    document.querySelector("#winning_fiesta").outerHTML = '';
    // clean played div
    const cells = document.querySelectorAll("#tictactoe > div");
    for (let i = 0; i < cells.length; i++) cells[i].className = '';
}

const endGameOverlay = player => {
    const div = document.querySelector("body > div");
    let status;
    if (player === 'Draw'){
        status = 'Draw';
    }
    else{
        status = `${player} is the winner`;
    }
    div.innerHTML += `
    <div id="winning_fiesta">
        <div>
            <h1>${status} !</h1>
            <div class="confetti"></div>
            <button onclick="handleReset()">Play again !</button>
        </div>
    </div>`;
}


function AddPlayer(name){
    const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if(name.length >= 50) return 'Must have less than 50 letter';
    if(format.test(name)) return 'Must not have special character';
    player.push(name.toString());
    return;
}

function CreateConfetti() {
    const confetti_container = document.querySelector('.confetti');
    color = [];
    for (let i = 0; i < 50; i++) {
        delay = Math.floor(Math.random() * 5);
        rnd_color = 0;
        rnd_left = 0;

        confetti_container.innerHTML += `<div class='${i}'></div>`;
        i.style = `background-color: #f2d74e; left: ${100/50}; animation-delay: -${delay}s;`;
    }
}

function Play(target, boardNbr) {
    if (isWinner(round) !== false) return; // check if already won
    if (board[boardNbr] != null) return; // return if already played
    board[boardNbr] = round; //play board nbr
    
    // Show card as played
    target.className = 'played';

    // render x for 1 && o for 2
    if(round === 1){
        target.innerHTML = `<img src="img/X.svg"/>`;
    }
    else{
        target.innerHTML = `<img src="img/O.svg"/>`;
    }

    // is winner
    winner = isWinner(round);
    switch (winner) {
        case true:
            endGameOverlay(player[round-1]);
            CreateConfetti();
            break;
        
        case "Draw":
            endGameOverlay('Draw');
            break;
        
        default:
            round == 1 ? round = 2: round = 1; //change round
            break;
    }
}


(()=>{
    Reset();
    // Ask for names of player
    // for (let i = 0; i < 2; i++) {
    //     let response = prompt(`Enter name of Player ${i+1}`);
    //     console.log(AddPlayer(response));
    // }
})();