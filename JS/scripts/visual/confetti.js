export const CreateConfetti = () => {
    const confetti_container = document.querySelector('.confetti'),
            colors = ['f2d74e','95c3de','ff9a91'],
            w = window.innerWidth;

    for (let i = 0; i < 40; i++) {
        const delay = Math.random() * 4;
        const rnd_color = colors[Math.floor(Math.random() * colors.length)];
        const rnd_left = ((Math.random() * w)/w)*100;
        confetti_container.insertAdjacentHTML('beforeend', `
        <div 
        style="
        background-color: #${rnd_color}; 
        left: ${rnd_left.toFixed(1)}%;
        animation-delay: -${delay.toFixed(1)}s;">
        </div>
        `);
    }
}