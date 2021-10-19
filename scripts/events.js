import { TicTacToe } from "./TicTacToe.js";
import * as constant from './constant.js';
import * as overlay from './overlays.js';
import { CreateConfetti } from './confetti.js';

export const handleReset = e => {
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


export const handleHoverOut = e => {
    const target = e.target;
    if(target.className !== 'played')target.innerHTML = '';
}

export const handleHover = (e,r) => {
    const target = e.target;
    if(target.className === 'played') return;
    // render x for 1 && o for 2
    if(r === 1){
        target.innerHTML = constant.x_img;
    }
    else{
        target.innerHTML = constant.o_img;
    }
}

export const handlePlay = (g,e,i) => {
    // play
    const round = g.Play(e, i);
    // change player overlay
    const p_overlay = document.querySelectorAll('#players_overlay p');
    if (round == 1) {
        p_overlay[0].className = 'active_player';
        p_overlay[1].className = '';
    } else {
        p_overlay[1].className = 'active_player';
        p_overlay[0].className = '';
    }
}

export const Reset = () => {
    let player = ['Player 1', 'Player 2'];
    // reset player overlay
    const p_overlay = document.querySelectorAll('#players_overlay p');
    // Ask for names of player
    // for (let i = 0; i < 2; i++) {
    //     let response = prompt(`Enter name of Player ${i+1}`);
    //     player[i] = response;
    //     p_overlay[i].innerText = response;
    // }
    const game = new TicTacToe(player);
    // assign play on click on table
    const cells = document.querySelectorAll("#tictactoe > div");
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerHTML = '';
        cells[i].onclick = (e) => handlePlay(game, e.target, i);
        cells[i].onmouseover = (e) => handleHover(e, game.round);
        cells[i].onmouseout = handleHoverOut;
    }
}

export const ShowEndOverlay = (p, msg) => {
    const div = document.querySelector("body > div");
    let status;
    if (p === 'Draw'){
        status = 'Draw';
    }
    else{
        status = `${p} is the winner with ${msg}`;
    }
    div.innerHTML += overlay.endGameOverlay(status);
    document.querySelector("#winning_fiesta button").addEventListener('click', handleReset);
    CreateConfetti();
}

document.addEventListener("DOMContentLoaded", e => {
    Reset();
});