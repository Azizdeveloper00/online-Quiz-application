const questions = [
  // [15 sample questions – same as earlier]
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
  {
    question: "Which HTML tag is used to link CSS?",
    options: ["<css>", "<style>", "<link>", "<script>"],
    answer: 2
  },
  {
    question: "Which CSS property is used to change text color?",
    options: ["font-color", "text-color", "color", "text-style"],
    answer: 2
  },
  {
    question: "JavaScript is a ____-side programming language.",
    options: ["Client", "Server", "Both", "None"],
    answer: 2
  },
  {
    question: "Which tag is used for JavaScript?",
    options: ["<js>", "<javascript>", "<script>", "<code>"],
    answer: 2
  },
  {
    question: "Which method adds an element to the end of an array?",
    options: ["push()", "pop()", "shift()", "add()"],
    answer: 0
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    options: ["//", "/* */", "#", "<!-- -->"],
    answer: 0
  },
  {
    question: "Which CSS property controls font size?",
    options: ["font-size", "text-size", "size", "fontStyle"],
    answer: 0
  },
  {
    question: "HTML attribute for image source is?",
    options: ["href", "src", "link", "source"],
    answer: 1
  },
  {
    question: "Which keyword declares a variable in JS?",
    options: ["var", "dim", "int", "string"],
    answer: 0
  },
  {
    question: "How do you write an IF statement in JS?",
    options: ["if i = 5", "if i == 5 then", "if (i == 5)", "if i = 5 then"],
    answer: 2
  },
  {
    question: "Which HTML tag defines a table row?",
    options: ["<td>", "<tr>", "<th>", "<row>"],
    answer: 1
  },
  {
    question: "Which CSS unit is relative to the root element?",
    options: ["em", "rem", "%", "px"],
    answer: 1
  },
  {
    question: "Which of the following is a JavaScript framework?",
    options: ["Laravel", "React", "Django", "Bootstrap"],
    answer: 1
  }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15;

const questionNumber = document.getElementById("question-number");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const nextBtn = document.getElementById("next-btn");
const submitBtn = document.getElementById("submit-btn");
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
    button.addEventListener("click", () => selectAnswer(button, index));
    optionsContainer.appendChild(button);
  });

  startTimer();

  // Show correct button
  if (currentQuestion === questions.length - 1) {
    nextBtn.style.display = "none";
    submitBtn.style.display = "inline-block";
  } else {
    nextBtn.style.display = "inline-block";
    submitBtn.style.display = "none";
  }
}

function resetState() {
  clearInterval(timer);
  timeLeft = 15;
  timerDisplay.innerText = timeLeft;
  optionsContainer.innerHTML = "";
  nextBtn.disabled = true;
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.innerText = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timer);
      showCorrectAnswer();
      nextBtn.disabled = false;
    }
  }, 1000);
}

function selectAnswer(selectedBtn, selectedIndex) {
  clearInterval(timer);
  const correctIndex = questions[currentQuestion].answer;
  const options = document.querySelectorAll(".option");

  options.forEach(btn => {
    btn.style.pointerEvents = "none";
    if (btn.innerText === questions[currentQuestion].options[correctIndex]) {
      btn.classList.add("correct");
    }
  });

  if (selectedIndex === correctIndex) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("wrong");
  }

  nextBtn.disabled = false;
}

function showCorrectAnswer() {
  const correctIndex = questions[currentQuestion].answer;
  const options = document.querySelectorAll(".option");
  options.forEach((btn, idx) => {
    btn.style.pointerEvents = "none";
    if (idx === correctIndex) {
      btn.classList.add("correct");
    }
  });
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  }
});

submitBtn.addEventListener("click", () => {
  document.getElementById("quiz-container").style.display = "none";
  const resultContainer = document.getElementById("result-container");
  resultContainer.style.display = "block";

  const percent = Math.round((score / questions.length) * 100);
  document.getElementById("score-percent").innerText = `${percent}%`;

  const message = percent >= 80 ? "Excellent! 🎉" : percent >= 50 ? "Good Job!" : "Keep Practicing!";
  document.getElementById("score-message").innerText = `You scored ${score} out of ${questions.length}. ${message}`;

  if (percent >= 80) {
    launchConfetti();
  }
});

function launchConfetti() {
  const duration = 5 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

// START THE QUIZ
startQuiz();
