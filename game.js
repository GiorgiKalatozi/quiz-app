const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "Who Discovered America?",
    choice1: "Barak Obama",
    choice2: " Christopher Columbus",
    choice3: "Viking Leif Erikson",
    choice4: "Amerigo Vespucci",
    answer: 2,
  },
  {
    question: "What is considered the largest empire in history??",
    choice1: "Mongol Empire",
    choice2: "British Empire",
    choice3: "Spanish empire",
    choice4: "Russian Empire",
    answer: 1,
  },
  {
    question:
      "Where did Albert Einstein live before moving to the United States?",
    choice1: "Israel",
    choice2: "France",
    choice3: "Georgia",
    choice4: "Germany",
    answer: 4,
  },
  {
    question:
      "How old was Queen Elizabeth II when she was crowned the Queen of England?",
    choice1: "27",
    choice2: " 14",
    choice3: "7",
    choice4: "4",
    answer: 1,
  },
  {
    question: "What year was Facebook created?",
    choice1: "1998",
    choice2: " 2000",
    choice3: "2002",
    choice4: "2004",
    answer: 4,
  },
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 5;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("/end.html");
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
