// Game configuration
const CARD_IMAGES = [
    'https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', // lion
    'https://images.pexels.com/photos/45853/giraffe-zoo-animal-safari-45853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', // giraffe
    'https://images.pexels.com/photos/47547/squirrel-animal-cute-rodents-47547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', // squirrel
    'https://images.pexels.com/photos/158109/kodiak-brown-bear-adult-portrait-wildlife-158109.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', // bear
    'https://images.pexels.com/photos/64219/dolphin-marine-mammals-water-sea-64219.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', // dolphin
    'https://images.pexels.com/photos/38280/monkey-mandril-africa-baboon-38280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', // monkey
    'https://images.pexels.com/photos/2361/nature-animal-wolf-wilderness.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', // wolf
    'https://images.pexels.com/photos/145939/pexels-photo-145939.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' // elephant
];

// Game state
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let timer = 0;
let timerInterval;
let gameStarted = false;

// DOM elements
const startButton = document.getElementById('start-button');
const gameGrid = document.getElementById('game-grid');
const moveCounter = document.getElementById('move-counter');
const timerDisplay = document.getElementById('timer');
const victoryScreen = document.getElementById('victory-screen');
const restartButton = document.getElementById('restart-button');

// Initialize game
function initGame() {
    // Create pairs of cards
    cards = [...CARD_IMAGES, ...CARD_IMAGES];
    shuffleCards(cards);
    createCardGrid();
    matchedPairs = 0;
    moves = 0;
    moveCounter.textContent = moves;
    timer = 0;
    timerDisplay.textContent = timer;
    gameStarted = false;
}

// Shuffle cards using Fisher-Yates algorithm
function shuffleCards(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Create card grid
function createCardGrid() {
    gameGrid.innerHTML = '';
    cards.forEach((image, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.index = index;
        card.dataset.image = image;
        card.style.backgroundImage = `url(${image})`;
        card.addEventListener('click', flipCard);
        gameGrid.appendChild(card);
    });
}

// Flip card
function flipCard() {
    if (!gameStarted) {
        startGame();
    }

    // Don't allow flipping if already flipped or matched
    if (flippedCards.length === 2 || this.classList.contains('flipped')) {
        return;
    }

    this.classList.add('flipped');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        moves++;
        moveCounter.textContent = moves;
        checkForMatch();
    }
}

// Check for matching cards
function checkForMatch() {
    const [card1, card2] = flippedCards;
    const isMatch = card1.dataset.image === card2.dataset.image;

    if (isMatch) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        flippedCards = [];

        if (matchedPairs === CARD_IMAGES.length) {
            endGame();
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

// Start game timer
function startGame() {
    gameStarted = true;
    timerInterval = setInterval(() => {
        timer++;
        timerDisplay.textContent = timer;
    }, 1000);
}

// End game
function endGame() {
    clearInterval(timerInterval);
    victoryScreen.classList.remove('hidden');
    victoryScreen.classList.add('victory');
}

// Event listeners
startButton.addEventListener('click', () => {
    document.getElementById('start-screen').classList.add('hidden');
    gameGrid.classList.remove('hidden');
    initGame();
});

restartButton.addEventListener('click', () => {
    victoryScreen.classList.add('hidden');
    victoryScreen.classList.remove('victory');
    initGame();
});

// Initialize on load
initGame();