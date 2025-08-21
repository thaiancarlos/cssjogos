const box = document.getElementById('box');
const target = document.getElementById('target');
const cssCodeTextarea = document.getElementById('css-code');
const feedbackElement = document.getElementById('feedback');
const levelCounter = document.getElementById('level-counter');
const progress = document.getElementById('progress');
const challengeText = document.getElementById('challenge-text');
const applyBtn = document.getElementById('apply-btn');
const checkBtn = document.getElementById('check-btn');
const nextLevelBtn = document.getElementById('next-level-btn');

const maxLevels = 5;
let currentLevel = 1;
const tolerance = 5; // Tolerância em pixels para a verificação

// Coordenadas dos alvos para cada nível
const levels = [
    { text: "Posicione a caixa vermelha no canto superior direito.", target: { top: 0, left: 350 } },
    { text: "Posicione a caixa vermelha no canto inferior esquerdo.", target: { top: 350, left: 0 } },
    { text: "Centralize a caixa vermelha no centro da arena.", target: { top: 175, left: 175 } },
    { text: "Posicione a caixa vermelha no canto inferior direito.", target: { top: 350, left: 350 } },
    { text: "Posicione a caixa vermelha no centro do lado esquerdo.", target: { top: 175, left: 0 } }
];

function initializeGame() {
    updateUI();
    loadLevel(currentLevel);
}

function loadLevel(level) {
    if (level > maxLevels) {
        endGame();
        return;
    }
    const levelData = levels[level - 1];
    target.style.top = `${levelData.target.top}px`;
    target.style.left = `${levelData.target.left}px`;
    challengeText.textContent = levelData.text;
    
    // Esconder a caixa de próximo nível
    nextLevelBtn.style.display = 'none';
    
    // Reseta o input e a caixa
    cssCodeTextarea.value = '';
    box.style.cssText = 'position: absolute; top: 0; left: 0;';
    
    // Reseta o feedback
    feedbackElement.textContent = '';
    feedbackElement.className = 'feedback';
}

function updateUI() {
    levelCounter.textContent = `Nível ${currentLevel} de ${maxLevels}`;
    const progressPercentage = (currentLevel - 1) / maxLevels * 100;
    progress.style.width = `${progressPercentage}%`;
}

function applyCss() {
    const userCss = cssCodeTextarea.value;
    try {
        // Limpa estilos anteriores e aplica os novos
        box.style.cssText = `position: absolute; ${userCss}`;
        feedbackElement.textContent = "CSS aplicado. Agora verifique a posição!";
        feedbackElement.className = 'feedback';
    } catch (e) {
        feedbackElement.textContent = "Erro de sintaxe no CSS. Tente novamente.";
        feedbackElement.className = 'feedback incorrect';
    }
}

function checkPosition() {
    const targetRect = target.getBoundingClientRect();
    const boxRect = box.getBoundingClientRect();

    // Calcula a posição da caixa em relação ao alvo
    const isCorrect = Math.abs(boxRect.left - targetRect.left) < tolerance &&
                      Math.abs(boxRect.top - targetRect.top) < tolerance;

    if (isCorrect) {
        feedbackElement.textContent = "Parabéns! Posição correta!";
        feedbackElement.className = 'feedback correct';
        nextLevelBtn.style.display = 'block';
    } else {
        feedbackElement.textContent = "Ops! A caixa não está no lugar certo. Tente outra vez!";
        feedbackElement.className = 'feedback incorrect';
        nextLevelBtn.style.display = 'none';
    }
}

function nextLevel() {
    currentLevel++;
    if (currentLevel <= maxLevels) {
        loadLevel(currentLevel);
        updateUI();
    } else {
        endGame();
    }
}

function endGame() {
    challengeText.textContent = "Parabéns! Você completou todos os desafios de CSS!";
    box.style.display = 'none';
    target.style.display = 'none';
    feedbackElement.textContent = "Fim de Jogo!";
    feedbackElement.className = 'feedback correct';
    applyBtn.style.display = 'none';
    checkBtn.style.display = 'none';
    nextLevelBtn.style.display = 'none';
}

// Adiciona os event listeners aos botões
applyBtn.addEventListener('click', applyCss);
checkBtn.addEventListener('click', checkPosition);
nextLevelBtn.addEventListener('click', nextLevel);

// Inicia o jogo
initializeGame();