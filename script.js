const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "Home Tool Markup Language",
      "Hyperlinks and Text Markup Language",
      "Hyperlinking Text Making Language",
    ],
    answer: 0
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Creative Style Sheets",
      "Colorful Style Sheets",
      "Cascading Style Sheets",
      "Computer Style Sheets",
    ],
    answer: 2
  },
  // Add 13 more questions here
];

let currentQuestion = 0;
let timer;
let timeLeft = 15;

const questionNumber = document.getElementById("question-number");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const nextBtn = document.getElementById("next-btn");
const timerDisplay = document.getElementById("timer");

function startQuiz() {
  showQuestion();
}

function showQuestion() {
  resetState();
  let q = questions[currentQuestion];
  questionNumber.innerText = `Question ${currentQuestion + 1} of ${questions.length}`;
  questionText.innerText = q.question;

  q.options.forEach((optionText, index) => {
    const button = document.createElement("div");
    button.classList.add("option");
    button.innerText = optionText;
    button.addEventListener("click", () => selectAnswer(button, index === q.answer));
    optionsContainer.appendChild(button);
  });

  startTimer();
}

function resetState() {
  clearInterval(timer);
  timeLeft = 15;
  timerDisplay.innerText = timeLeft;
  optionsContainer.innerHTML = "";
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.innerText = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timer);
      disableOptions();
    }
  }, 1000);
}

function selectAnswer(button, isCorrect) {
  clearInterval(timer);
  const allOptions = document.querySelectorAll(".option");
  allOptions.forEach(opt => opt.removeEventListener("click", selectAnswer));

  if (isCorrect) {
    button.classList.add("correct");
  } else {
    button.classList.add("wrong");
    document.querySelectorAll(".option")[questions[currentQuestion].answer].classList.add("correct");
  }

  disableOptions();
}

function disableOptions() {
  const allOptions = document.querySelectorAll(".option");
  allOptions.forEach(opt => {
    opt.style.pointerEvents = "none";
  });
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    alert("Quiz finished!");
    // You can redirect or restart
  }
});

startQuiz();

