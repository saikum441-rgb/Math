// DOM Elements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const failScreen = document.getElementById('fail-screen');

const startBtn = document.getElementById('start-btn');
const submitBtn = document.getElementById('submit-btn');
const tryAgainBtn = document.getElementById('try-again-btn');

const questionText = document.getElementById('question-text');
const answerInput = document.getElementById('answer-input');
const scoreDisplay = document.getElementById('score');
const endScoreDisplay = document.getElementById('end-score');
const timeLeftDisplay = document.getElementById('time-left');

// Game Variables
let score = 0;
let correctAnswer = 0;
let timer;
let timeLeft = 10;

// Event Listeners
startBtn.addEventListener('click', startGame);
submitBtn.addEventListener('click', checkAnswer);
tryAgainBtn.addEventListener('click', startGame);

// Allow pressing 'Enter' to submit the answer
answerInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        checkAnswer();
    }
});

function startGame() {
    score = 0;
    scoreDisplay.textContent = score;
    
    // Switch screens
    startScreen.classList.remove('active');
    failScreen.classList.remove('active');
    quizScreen.classList.add('active');
    
    generateQuestion();
}

function startTimer() {
    clearInterval(timer);
    timeLeft = 10;
    timeLeftDisplay.textContent = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        timeLeftDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            gameOver(); // Trigger fail screen when time runs out
        }
    }, 1000);
}

function generateQuestion() {
    answerInput.value = '';
    answerInput.focus();
    startTimer(); // Reset and start the 10-second timer for each question

    // Kid-friendly operations: +, -, *, /
    const operations = ['+', '-', '*', '/'];
    const operation = operations[Math.floor(Math.random() * operations.length)];

    let num1, num2;

    switch (operation) {
        case '+':
            num1 = Math.floor(Math.random() * 10) + 1;
            num2 = Math.floor(Math.random() * 10) + 1;
            correctAnswer = num1 + num2;
            break;

        case '-':
            num1 = Math.floor(Math.random() * 10) + 1;
            num2 = Math.floor(Math.random() * 10) + 1;
            if (num1 < num2) {
                let temp = num1;
                num1 = num2;
                num2 = temp;
            }
            correctAnswer = num1 - num2;
            break;

        case '*':
            num1 = Math.floor(Math.random() * 5) + 1;
            num2 = Math.floor(Math.random() * 5) + 1;
            correctAnswer = num1 * num2;
            break;

        case '/':
            num2 = Math.floor(Math.random() * 5) + 1;
            let multiplier = Math.floor(Math.random() * 5) + 1;
            num1 = num2 * multiplier;
            correctAnswer = num1 / num2;
            break;
    }

    questionText.textContent = `${num1} ${operation} ${num2} = ?`;
}

function checkAnswer() {
    const userAnswer = parseFloat(answerInput.value);

    if (isNaN(userAnswer)) {
        alert("Please type a number first! 😊");
        return;
    }

    if (userAnswer === correctAnswer) {
        // Correct Answer -> Increase score, stop current timer, and get next question
        score++;
        scoreDisplay.textContent = score;
        generateQuestion();
    } else {
        // Wrong Answer -> Trigger fail screen
        gameOver();
    }
}

function gameOver() {
    clearInterval(timer); // Stop the countdown
    quizScreen.classList.remove('active');
    failScreen.classList.add('active');
    endScoreDisplay.textContent = score;
}