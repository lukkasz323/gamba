const $slotMachine = document.getElementById('slot-machine') as HTMLDivElement;
const $slot1 = document.getElementById('slot1') as HTMLDivElement;
const $slot2 = document.getElementById('slot2') as HTMLDivElement;
const $slot3 = document.getElementById('slot3') as HTMLDivElement;

const symbols = ['🍒', '💎', '🍉', '🔔'];
const usedSymbols = [ // TODO: Use this in code below
    Array.from({ length: 4 }, () => symbols[Math.floor(Math.random() * symbols.length)]),
    Array.from({ length: 4 }, () => symbols[Math.floor(Math.random() * symbols.length)]),
    Array.from({ length: 4 }, () => symbols[Math.floor(Math.random() * symbols.length)])
];

let startOffset = [0, 12, 24, 36];
let offset = [Array.from(startOffset), Array.from(startOffset), Array.from(startOffset)];
let velocity = [3, 3, 3, 3]; // Ensure velocity has the same length as startOffset
let delay = [2,9, 1, 8];
let doSlowdown = [false, false, false];

// Init
for (const slot of $slotMachine.children) {
    for (const symbol of symbols) {
        const symbolDiv = document.createElement('div');
        symbolDiv.textContent = symbol;
        symbolDiv.classList.add('symbol-div');
        slot.appendChild(symbolDiv);
    }
}

for (let i = 0; i < delay.length; i++) {
    setTimeout(() => {
        doSlowdown[i] = true;
    }, delay[i] * 1000);
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
    const slowdownDelta = 0.01;
    for (let i = 0; i < velocity.length; i++) {
        if (doSlowdown[i]) {   
            if (velocity[i] > 0) {
                velocity[i] -= slowdownDelta;
                // Full stop
                if (velocity[i] < 0.1 && velocity[i] > -0.1) {
                    velocity[i] = 0;
                }
            }
        }
    }

    // Update CSS
    for (let i = 0; i < $slotMachine.children.length; i++) {
        const slot = $slotMachine.children[i] as HTMLDivElement;
        for (let j = 0; j < slot.children.length; j++) {
            const symbolDiv = slot.children[j] as HTMLDivElement;
            symbolDiv.style.transform = `translateY(${offset[i][j] - 50}px)`;
        }
    }
    
    console.log(doSlowdown, offset[0], offset[1], offset[2]) // Debug
    requestAnimationFrame(gamba);
}