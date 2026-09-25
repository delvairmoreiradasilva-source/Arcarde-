// ==============================
// ECLIPSE LEGENDS
// Sistema básico de batalha
// ==============================

let playerHealth = 30;
let enemyHealth = 30;

let playerEnergy = 10;
let enemyEnergy = 10;

let playerTurn = true;

// ==============================
// CARTAS
// ==============================

const cards = {

    Kairo: {
        name: "Kairo",
        power: 94,
        defense: 72,
        energy: 3,
        ability: "Explosão Solar"
    },

    Raizen: {
        name: "Raizen",
        power: 91,
        defense: 65,
        energy: 4,
        ability: "Mil Raios"
    },

    Noctis: {
        name: "Noctis",
        power: 88,
        defense: 83,
        energy: 4,
        ability: "Abismo Eterno"
    }

};

// ==============================
// ELEMENTOS DA TELA
// ==============================

const playerHealthText =
    document.getElementById("playerHealth");

const enemyHealthText =
    document.getElementById("enemyHealth");

const message =
    document.getElementById("message");


// ==============================
// ATUALIZAR TELA
// ==============================

function updateScreen() {

    playerHealthText.textContent = playerHealth;
    enemyHealthText.textContent = enemyHealth;

}


// ==============================
// ATAQUE NORMAL
// ==============================

function attack() {

    if (!playerTurn) {

        message.textContent =
            "⏳ Espere sua vez!";

        return;

    }

    const damage = Math.floor(Math.random() * 6) + 3;

    enemyHealth -= damage;

    if (enemyHealth < 0) {
        enemyHealth = 0;
    }

    message.textContent =
        `⚔️ Você causou ${damage} de dano!`;

    updateScreen();

    checkWinner();

    if (enemyHealth > 0) {

        playerTurn = false;

        setTimeout(enemyAttack, 1000);

    }

}


// ==============================
// ATAQUE DO INIMIGO
// ==============================

function enemyAttack() {

    const damage = Math.floor(Math.random() * 5) + 2;

    playerHealth -= damage;

    if (playerHealth < 0) {
        playerHealth = 0;
    }

    message.textContent =
        `👹 O inimigo causou ${damage} de dano!`;

    updateScreen();

    checkWinner();

    if (playerHealth > 0) {

        playerTurn = true;

        message.textContent =
            "🔥 Sua vez!";

    }

}


// ==============================
// USAR CARTA
// ==============================

function useCard(cardName) {

    if (!playerTurn) {

        message.textContent =
            "⏳ Espere sua vez!";

        return;

    }

    const card = cards[cardName];

    if (!card) {

        message.textContent =
            "Carta não encontrada!";

        return;

    }

    if (playerEnergy < card.energy) {

        message.textContent =
            "⚡ Energia insuficiente!";

        return;

    }

    playerEnergy -= card.energy;

    const damage =
        Math.floor(card.power / 10) +
        Math.floor(Math.random() * 6);

    enemyHealth -= damage;

    if (enemyHealth < 0) {
        enemyHealth = 0;
    }

    message.textContent =
        `🔥 ${card.name} usou ${card.ability} e causou ${damage} de dano!`;

    updateScreen();

    checkWinner();

    if (enemyHealth > 0) {

        playerTurn = false;

        setTimeout(enemyAttack, 1200);

    }

}


// ==============================
// COMPRAR CARTA
// ==============================

function drawCard() {

    const cardContainer =
        document.getElementById("cardContainer");

    const availableCards =
        Object.keys(cards);

    const randomCard =
        availableCards[
            Math.floor(
                Math.random() * availableCards.length
            )
        ];

    const card =
        cards[randomCard];

    const newCard =
        document.createElement("div");

    newCard.className = "card";

    newCard.innerHTML = `

        <h3>✨ ${card.name}</h3>

        <p>Raridade: Lendária</p>

        <p>⚔️ Poder: ${card.power}</p>

        <p>🛡️ Defesa: ${card.defense}</p>

        <p>⚡ Energia: ${card.energy}</p>

        <p>✨ ${card.ability}</p>

        <button onclick="useCard('${card.name}')">
            Usar
        </button>

    `;

    cardContainer.appendChild(newCard);

    message.textContent =
        `🃏 Você comprou ${card.name}!`;

}


// ==============================
// VERIFICAR VENCEDOR
// ==============================

function checkWinner() {

    if (enemyHealth <= 0) {

        message.textContent =
            "🏆 VOCÊ VENCEU!";

        playerTurn = false;

        return;

    }

    if (playerHealth <= 0) {

        message.textContent =
            "💀 VOCÊ PERDEU!";

        playerTurn = false;

        return;

    }

}


// ==============================
// INICIAR JOGO
// ==============================

updateScreen();

message.textContent =
    "🔥 A batalha começou! Sua vez!";
