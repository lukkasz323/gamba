const $slotMachine = document.getElementById('slot-machine') as HTMLDivElement;
const $slot1 = document.getElementById('slot1') as HTMLDivElement;
const $slot2 = document.getElementById('slot2') as HTMLDivElement;
const $slot3 = document.getElementById('slot3') as HTMLDivElement;

const symbols = ['🍒', '7', '🍋', '🍉'];

let startOffset = [0, 12, 20, 36];
let offset = [Array.from(startOffset), Array.from(startOffset), Array.from(startOffset)];
let velocity = [3, 3, 3, 3]; // Ensure velocity has the same length as startOffset

// Init
for (const slot of $slotMachine.children) {
    for (const symbol of symbols) {
        const symbolDiv = document.createElement('div');
        symbolDiv.textContent = symbol;
        symbolDiv.classList.add('symbol-div');
        slot.appendChild(symbolDiv);
    }
}

// Loop
requestAnimationFrame(gamba);
function gamba() {
    for (let i = 0; i < offset.length; i++) {
        for (let j = 0; j < offset[i].length; j++) {
            offset[i][j] += velocity[i]; 
            if (offset[i][j] > 90) {
                offset[i][j] = 0;
            }
        }
    }
    
    // Slowdown
    if (velocity[1] > 0) {
        velocity[1] -= 0.01;
    }

    // Update CSS
    for (let i = 0; i < $slotMachine.children.length; i++) {
        const slot = $slotMachine.children[i] as HTMLDivElement;
        for (let j = 0; j < slot.children.length; j++) {
            const symbolDiv = slot.children[j] as HTMLDivElement;
            symbolDiv.style.transform = `translateY(${offset[i][j] - 50}px)`;
        }
    }
    
    console.log(offset[0], offset[1], offset[2]) // Debug
    requestAnimationFrame(gamba);
}