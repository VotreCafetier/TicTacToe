import { TicTacToe } from "./game/TicTacToe.js";
import * as constant from './constant.js';
import * as overlay from './visual/overlays.js';
import { CreateConfetti } from './visual/confetti.js';
import { GetRndName } from './visual/Name.js';

// ----------------- Tic Tac Toe -----------------
export const handleReset = e => {
    // get player from player overlay and replay a game
    const p = [],
        player_overlay = document.querySelectorAll('#players_overlay > p');
    player_overlay.forEach(e => p.push(e.innerText));
    Reset(p);

    // clean played div
    const cells = document.querySelectorAll("#tictactoe > div");
    for (let i = 0; i < cells.length; i++) cells[i].className = '';
    
    // reset player overlay
    const p_overlay = document.querySelectorAll('#players_overlay p');
    p_overlay[0].className = 'active_player';
    p_overlay[1].className = '';
}


export const handleHoverOut = e => {
    const t = e.target;
    if(t.className !== 'played')t.innerHTML = '';  // if not played then remove everything inside the div (the icon)
}

export const handleHover = (e,r) => {
    const t = e.target;
    if(t.className === 'played') return;  // if already played, return
    r === 1?t.innerHTML = constant.x_img:t.innerHTML = constant.o_img;  // render x for 1 && o for 2
}

export const handlePlay = (g,e,i) => {
    const round = g.Play(e, i); // play
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

export const Reset = player => {
    document.querySelectorAll('.overlay').forEach(e => e.remove());  // closes all overlays
    // reset player overlay
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


// ----------------- Show overlay -----------------
export const ShowEndOverlay = (p, msg) => {
    const div = document.querySelector("body > div");
    let status;
    p === 'Draw'?status = 'Draw':status = `${p} is the winner with ${msg}`;
    div.innerHTML += overlay.endGameOverlay(status);
    document.querySelector("#winning_fiesta button").addEventListener('click', handleReset);
    CreateConfetti();
}

export const ShowNameOverlay = (e) => {
    // show name overlay
    const body = document.querySelector("body > div");
    body.innerHTML += overlay.NameOverlay();


    const btn_enter = document.querySelector("#NameForm button"),
        rnd_link = document.querySelectorAll("#NameForm a");
    
    
    btn_enter.onclick = SubmitName;  // submit btn

    // async function for random button
    rnd_link.forEach(e => {
        e.onclick = async () => {
            const o = document.querySelector(".overlay > div"),
                input = e.previousElementSibling;
            o.insertAdjacentHTML('afterbegin', overlay.Loader()); // show loader
            input.disabled = true;
            let name = await GetRndName();  // fetch a random name from api
            // remove all dots from string
            input.disabled = false;
            input.value = name.replace(/\./g, '');  // place the name and remove all dots
            o.querySelector('.loader').remove(); // remove loader
        };
    });
}


// ----------------- Name overlay -----------------
export const SubmitName = () =>{
    let names = [];
    const inputNom = document.querySelectorAll("#NameForm input[type=text]"),
        regex = /^[a-zA-Z0-9\s]+$/g;
    inputNom.forEach(e => {
        e.value.match(regex) && e.value !== ''?names.push(e.value):console.log('doesnt works');  // Check if names is not empty and is just number or letter or space
    });
    if(names.length === 2){
        Reset(names);
        // show names in player overlay
        const span_player = document.querySelectorAll('#players_overlay > p');
        for (let i = 0; i < span_player.length; i++) span_player[i].innerText = names[i];
    }
}


// ----------------- Onload -----------------
document.addEventListener("DOMContentLoaded", () => {
    ShowNameOverlay(); // show name overlay
    document.querySelector("footer span").innerText = new Date().getFullYear();  //Replace date in footer for current year
});