export const CreateConfetti = () => {
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