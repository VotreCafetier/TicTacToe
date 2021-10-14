class TicTacToe{
    constructor(Player){
        this.player = Player;
        this.board = [
            null, null, null, // 0 1 2
            null, null, null, // 3 4 5
            null, null, null  // 6 7 8
        ];
        this.round = 1;
        this.winner_comb = {
            'First Row': [1,1,1,0,0,0,0,0,0],
            'Second Row': [0,0,0,1,1,1,0,0,0],
            'Third Row': [0,0,0,0,0,0,1,1,1],
            'First Col': [1,0,0,1,0,0,1,0,0],
            'Second Col': [0,1,0,0,1,0,0,1,0],
            'Third Col': [0,0,1,0,0,1,0,0,1],
            'Diagonal Left': [1,0,0,0,1,0,0,0,1],
            'Diagonal Right': [0,0,1,0,1,0,1,0,0]
        };
    }

    isWinner(r){
        // Check every combination
        for (const [key, value] of Object.entries(this.winner_comb)) {
            // convert to flat array (just player)
            let temp = [];
            for (let i = 0; i < this.board.length; i++) {
                this.board[i] === r?temp.push(1):temp.push(0);
                if (temp[i] !== value[i] && temp[i] === 1)temp[i] = 0;
            }

            for (let i = 0; i < temp.length; i++) {
                if (temp[i] !== value[i]) break;
                if (i === (temp.length-1)) return { win: true, comb: key };
            }
        }

        // Check if board is full
        for (let i = 0; i < this.board.length; i++) {
            if (this.board[i] === null) break;
            if (i === (this.board.length-1)) return { win: "Draw"};
        }

        return { win:false };
    }

    // Not finished yet
    CreateConfetti() {
        const confetti_container = document.querySelector('.confetti');
        const colors = ['#f2d74e','#95c3de','#ff9a91'];
        
        // background-color: ${rnd_color}; 
        // left: ${rnd_left}px; 
        // animation-delay: -${delay}s;
        for (let i = 0; i < 50; i++) {
            const delay = Math.floor(Math.random() * 5);
            const rnd_color = colors[Math.floor(Math.random() * colors.length)];
            const rnd_left = Math.ceil(Math.random() * window.innerWidth);
            confetti_container.innerHTML += `
            <div 
            class="${i}"
            style="
            "
            >
            </div>
            `;
            //i.style = `background-color: #f2d74e; left: ${100/50}; animation-delay: -${delay}s;`;
        }
    }

    ShowEndOverlay(p, msg){
        const div = document.querySelector("body > div");
        let status;
        if (p === 'Draw'){
            status = 'Draw';
        }
        else{
            status = `${p} is the winner with ${msg}`;
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
    
    Play(target, boardNbr) {
        if (this.isWinner(this.round).win !== false) return; // check if already won
        if (this.board[boardNbr] != null) return; // return if already played
        this.board[boardNbr] = this.round; //play board nbr
        
        // Show card as played
        target.className = 'played';
    
        // render x for 1 && o for 2
        if(this.round === 1){
            target.innerHTML = `<img src="img/X.svg"/>`;
        }
        else{
            target.innerHTML = `<img src="img/O.svg"/>`;
        }
    
        // is winner
        const winner = this.isWinner(this.round);
        switch (winner.win) {
            case true:
                this.ShowEndOverlay(this.player[this.round-1], winner.comb);
                this.CreateConfetti();
                break;
            
            case "Draw":
                this.ShowEndOverlay('Draw');
                break;
            
            default:
                this.round == 1 ? this.round = 2: this.round = 1; //change round
                break;
        }
        return this.round;
    }
}


const handleHoverOut = e => {
    target = e.target;
    if(target.className !== 'played')target.innerHTML = '';
}

const handleHover = (e,r) => {
    const target = e.target;
    if(target.className === 'played') return;
    // render x for 1 && o for 2
    if(r === 1){
        target.innerHTML = `<img src="img/X.svg" alt="X" />`;
    }
    else{
        target.innerHTML = `<img src="img/O.svg" alt="O" />`;
    }
}

const handleReset = e => {
    Reset();
    //close overlay
    document.querySelector("#winning_fiesta").outerHTML = '';
    // clean played div
    const cells = document.querySelectorAll("#tictactoe > div");
    for (let i = 0; i < cells.length; i++) cells[i].className = '';
    
    // reset player overlay
    const p_overlay = document.querySelectorAll('#players_overlay p');
    p_overlay[0].className = 'active_player';
    p_overlay[1].className = '';
}

const handlePlay = (g,e,i) => {
    // play
    const round = g.Play(e, i);

    // change player overlay
    const p_overlay = document.querySelectorAll('#players_overlay p');
    console.log(p_overlay[0].className);
    if (round == 1) {
        p_overlay[0].className = 'active_player';
        p_overlay[1].className = '';
    } else {
        p_overlay[1].className = 'active_player';
        p_overlay[0].className = '';
    }
}

function Reset(){
    const game = new TicTacToe(['Player 1','Player 2']);
    // assign play on click on table
    const cells = document.querySelectorAll("#tictactoe > div");
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerHTML = '';
        cells[i].onclick = (e) => handlePlay(game, e.target, i);
        cells[i].onmouseover = (e) => handleHover(e, game.round);
        cells[i].onmouseout = handleHoverOut;
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