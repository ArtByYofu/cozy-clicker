const button = document.getElementById('clicker');
const scoreDisplay = document.getElementById('score');
const upgradeBtn = document.getElementById('upgradeBtn');
const multiplierDisplay = document.getElementById('multiplier');
const upgradeCostDisplay = document.getElementById('upgradeCost');

let score = parseInt(localStorage.getItem('cozyKawaiiClickerScore')) || 0;
let multiplier = parseInt(localStorage.getItem('cozyKawaiiClickerMultiplier')) || 1;
let upgradeCost = parseInt(localStorage.getItem('cozyKawaiiClickerUpgradeCost')) || 10;

scoreDisplay.textContent = score;
multiplierDisplay.textContent = multiplier;
upgradeCostDisplay.textContent = upgradeCost;

// Update UI upgrade button state
function updateUpgradeButton() {
    upgradeBtn.disabled = score < upgradeCost;
    upgradeBtn.style.opacity = upgradeBtn.disabled ? 0.6 : 1;
}

updateUpgradeButton();

// Click button event
button.addEventListener('click', () => {
    score += multiplier;
    scoreDisplay.textContent = score;
    localStorage.setItem('cozyKawaiiClickerScore', score);

    // Pop animation
    button.style.animation = 'pop 0.3s ease';
    button.addEventListener('animationend', () => {
        button.style.animation = '';
    }, { once: true });

    // Create floating heart
    createFloatingHeart();

    updateUpgradeButton();
});

// Upgrade button event
upgradeBtn.addEventListener('click', () => {
    if (score >= upgradeCost) {
        score -= upgradeCost;
        multiplier++;
        upgradeCost = Math.floor(upgradeCost * 1.5);

        scoreDisplay.textContent = score;
        multiplierDisplay.textContent = multiplier;
        upgradeCostDisplay.textContent = upgradeCost;

        // Save to localStorage
        localStorage.setItem('cozyKawaiiClickerScore', score);
        localStorage.setItem('cozyKawaiiClickerMultiplier', multiplier);
        localStorage.setItem('cozyKawaiiClickerUpgradeCost', upgradeCost);

        updateUpgradeButton();
    }
});

// Function to create a floating heart on click
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    heart.textContent = '💖';

    // Position near button randomly
    const rect = button.getBoundingClientRect();
    heart.style.left = (rect.left + rect.width / 2 + (Math.random() * 40 - 20)) + 'px';
    heart.style.top = (rect.top + rect.height / 2 + (Math.random() * 20 - 10)) + 'px';
    heart.style.position = 'fixed';

    document.body.appendChild(heart);

    // Remove heart after animation
    heart.addEventListener('animationend', () => {
        heart.remove();
    });
}
