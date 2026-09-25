// ==========================================
// ECLIPSE LEGENDS - SISTEMA DE BATALHA
// ==========================================

let playerHealth = 4000;
let enemyHealth = 4000;

let playerEnergy = 10;
let enemyEnergy = 10;

let turn = 1;
let playerTurn = true;

const cards = {
    Kairo: {
        name: "Kairo",
        element: "🔥",
        atk: 2800,
        def: 1800,
        cost: 3,
        skill: "Explosão Solar"
    },

    Raizen: {
        name: "Raizen",
        element: "⚡",
        atk: 2600,
        def: 1500,
        cost: 4,
        skill: "Mil Raios"
    },

    Noctis: {
        name: "Noctis",
        element: "🌑",
        atk: 2500,
        def: 1800,
        cost: 4,
        skill: "Abismo Eterno"
    },

    Ayla: {
        name: "Ayla",
        element: "🌊",
        atk: 1900,
        def: 2400,
        cost: 2,
        skill: "Cura das Marés"
    },

    Seraph: {
        name: "Seraph",
        element: "🌟",
        atk: 3000,
        def: 2600,
        cost: 5,
        skill: "Aurora Divina"
    }
};


// ==========================================
// ELEMENTOS DA INTERFACE
// ==========================================

const playerHealthText =
    document.getElementById("playerHealth");

const enemyHealthText =
    document.getElementById("enemyHealth");

const turnNumber =
    document.getElementById("turnNumber");

const message =
    document.getElementById("message");


// ==========================================
// ATUALIZAR INTERFACE
// ==========================================

function updateScreen() {

    playerHealthText.textContent =
        Math.max(0, playerHealth);

    enemyHealthText.textContent =
        Math.max(0, enemyHealth);

    turnNumber.textContent = turn;

}


// ==========================================
// MENSAGEM
// ==========================================

function showMessage(text) {
    message.textContent = text;
}


// ==========================================
// ATAQUE
// ==========================================

function attack() {

    if (!playerTurn) {

        showMessage("⏳ Aguarde sua vez!");

        return;
    }

    const damage =
        Math.floor(Math.random() * 301) + 500;

    enemyHealth -= damage;

    showMessage(
        `⚔️ Kairo atacou! ${damage} de dano!`
    );

    updateScreen();

    checkWinner();

    if (enemyHealth > 0) {

        playerTurn = false;

        setTimeout(enemyAttack, 1200);
    }
}


// ==========================================
// ATAQUE DO OPONENTE
// ==========================================

function enemyAttack() {

    const damage =
        Math.floor(Math.random() * 251) + 400;

    playerHealth -= damage;

    showMessage(
        `💥 Oponente atacou! ${damage} de dano!`
    );

    updateScreen();

    checkWinner();

    if (playerHealth > 0) {

        playerTurn = true;

        showMessage(
            "🔥 Sua vez!"
        );
    }
}


// ==========================================
// COMPRAR CARTA
// ==========================================

function drawCard() {

    if (!playerTurn) {

        showMessage(
            "⏳ Você precisa esperar sua vez."
        );

        return;
    }

    const names =
        Object.keys(cards);

    const randomName =
        names[
            Math.floor(
                Math.random() * names.length
            )
        ];

    const card =
        cards[randomName];

    const hand =
        document.querySelector(".hand");

    const newCard =
        document.createElement("div");

    newCard.className =
        "hand-card";

    newCard.innerHTML = `
        <span>${card.element}</span>
        <strong>${card.name}</strong>
    `;

    newCard.onclick = function () {
        useCard(card.name);
    };

    hand.appendChild(newCard);

    showMessage(
        `🃏 Você comprou ${card.name}!`
    );
}


// ==========================================
// USAR CARTA
// ==========================================

function useCard(cardName) {

    if (!playerTurn) {

        showMessage(
            "⏳ Aguarde sua vez!"
        );

        return;
    }

    const card =
        cards[cardName];

    if (!card) return;


    if (playerEnergy < card.cost) {

        showMessage(
            `⚡ Você precisa de ${card.cost} de energia!`
        );

        return;
    }


    playerEnergy -= card.cost;


    let damage =
        Math.floor(card.atk * 0.35);


    // Habilidades especiais

    if (cardName === "Kairo") {

        damage += 300;

        showMessage(
            `🔥 EXPLOSÃO SOLAR! ${damage} de dano!`
        );

    }

    else if (cardName === "Raizen") {

        damage += 250;

        showMessage(
            `⚡ MIL RAIOS! ${damage} de dano!`
        );

    }

    else if (cardName === "Noctis") {

        damage += 200;

        enemyEnergy =
            Math.max(0, enemyEnergy - 2);

        showMessage(
            `🌑 ABISMO ETERNO! ${damage} de dano!`
        );

    }

    else if (cardName === "Ayla") {

        const heal = 400;

        playerHealth =
            Math.min(
                4000,
                playerHealth + heal
            );

        showMessage(
            `🌊 AYLA recuperou ${heal} de vida!`
        );

    }

    else if (cardName === "Seraph") {

        damage += 500;

        showMessage(
            `🌟 AURORA DIVINA! ${damage} de dano!`
        );
    }


    enemyHealth -= damage;

    updateScreen();

    checkWinner();


    if (enemyHealth > 0) {

        playerTurn = false;

        setTimeout(enemyAttack, 1200);
    }
}


// ==========================================
// PASSAR TURNO
// ==========================================

function endTurn() {

    if (!playerTurn) {

        showMessage(
            "⏳ Não é seu turno."
        );

        return;
    }

    playerTurn = false;

    showMessage(
        "⏩ Você passou o turno."
    );

    setTimeout(enemyTurn, 900);
}


// ==========================================
// TURNO DO INIMIGO
// ==========================================

function enemyTurn() {

    enemyEnergy =
        Math.min(10, enemyEnergy + 2);

    showMessage(
        "👹 Oponente está jogando..."
    );

    setTimeout(() => {

        enemyAttack();

    }, 900);
}


// ==========================================
// PRÓXIMO TURNO
// ==========================================

function nextTurn() {

    turn++;

    playerEnergy =
        Math.min(10, playerEnergy + 2);

    playerTurn = true;

    updateScreen();

    showMessage(
        `🔥 TURNO ${turn}! Sua vez!`
    );
}


// ==========================================
// VERIFICAR VENCEDOR
// ==========================================

function checkWinner() {

    if (enemyHealth <= 0) {

        enemyHealth = 0;

        updateScreen();

        showMessage(
            "🏆 VITÓRIA! Você derrotou o oponente!"
        );

        playerTurn = false;

        return true;
    }


    if (playerHealth <= 0) {

        playerHealth = 0;

        updateScreen();

        showMessage(
            "💀 DERROTA! Sua vida chegou a zero."
        );

        playerTurn = false;

        return true;
    }

    return false;
}


// ==========================================
// INICIAR
// ==========================================

updateScreen();

showMessage(
    "🔥 A batalha começou! Sua vez!"
);
