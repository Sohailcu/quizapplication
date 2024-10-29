const quizData = [
    {
        question: "What does Html stand for?",
        options: [
            "Hyper transfer markup language",
            "Hyper text machine language",
            "Hyper text markup language",
            "HyperLink text markup language",
        ],
        correct: 2,
    },
    {
        question: "Which CSS property is used to change the text color of an element?",
        options: ["color", "font-color", "text-color", "background-color"],
        correct: 0,
    },
    {
        question: "What is the purpose of the <head> tag in HTML?",
        options: [
            "To display the main content of the page",
            "To link external resources like CSS and JS",
            "To create headings on the page",
            "To store images",
        ],
        correct: 1,
    },
    {
        question: "Which of the following is a JavaScript framework?",
        options: ["Django", "Flask", "React", "Laravel"],
        correct: 2,
    },
    {
        question: "What is the correct syntax to refer to an external script called 'app.js'?",
        options: [
            "script src='app.js'",
            "script href='app.js'",
            "script ref='app.js'",
            "script link='app.js'",
        ],
        correct: 0,
    },
    {
        question: "What routing mechanism does Next.js 14 use by default in the app directory?",
        options: [
            "Client-side Routing",
            "File-based Routing'",
            "API-based Routing",
            "Dynamic Routing",
        ],
        correct: 1,
    },
    {
        question: "What is the preferred way to manage routing in a Next.js application with the app directory??",
        options: [
            "Use of Link Component",
            "Use of a HTML Tag",
            "Use of Next/Link Package",
            "Use of React-Outer",
        ],
        correct: 2,
    },
    {
        question: "What is the componenet in Next.Js?",
        options: [
            "A Class that handles server-side routing",
            "A Fucntion or class that renders part of the UI",
            "A Library for fetching data",
            "A Bulit-in styling system",
        ],
        correct: 1,
    },
    {
        question: "Which of the following is the correct way to create a functional component in Next.js??",
        options: [
            "function MyComponent = <div>Hello World</div>;",
            "const MyComponent = () => <div>Hello World</div>;",
            "let MyComponent: <div>Hello World</div>;",
            "createComponent My Component () {return <div>Hello World</div>;}"
        ],
        correct: 1,
    },
    {
        question: "How do you export a component in Next.js?",
        options: [
            "export {MyComponent}",
            "module.exports = MyComponent",
            "export default MyComponent",
            "require('./MyComponent')"
        ],
        correct: 2,
    },

];

let quizBox = document.getElementById("Quiz");
let questions = document.getElementById("question");
let option1 = document.getElementById("option-1");
let option2 = document.getElementById("option-2");
let option3 = document.getElementById("option-3");
let option4 = document.getElementById("option-4");
let btn = document.getElementById("submit");
let timerDisplay = document.getElementById("timer");

let currentQuiz = 0;
let score = 0;
let timeLeft = 120; // 2 minutes in seconds
let timer;

const startSection = document.getElementById("start-section");
const quizSection = document.getElementById("quiz-section");
const startForm = document.getElementById("start-form");
const celebrationCanvas = document.getElementById("celebrationCanvas");

startForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    // Validate inputs (optional)
    if (name && email) {
        startSection.style.display = "none"; // Hide start page
        quizSection.style.display = "block"; // Show quiz section
        loadQuiz();
        startTimer();
    }
});

function loadQuiz() {
    questions.innerHTML = `${currentQuiz + 1}: ${quizData[currentQuiz].question}`;
    const options = quizData[currentQuiz].options;

    option1.innerHTML = options[0];
    option2.innerHTML = options[1];
    option3.innerHTML = options[2];
    option4.innerHTML = options[3];
}

function getSelectedOption() {
    const answers = document.querySelectorAll(".answer");
    let selectedOption;

    answers.forEach((answer, index) => {
        if (answer.checked) {
            selectedOption = index;
        }
    });

    return selectedOption;
}

btn.addEventListener("click", function () {
    const selectedOption = getSelectedOption();

    if (selectedOption === undefined) {
        Swal.fire("Please select an option!");
        return;
    }

     // Only increment the score if the selected option is correct and check if the question is correct
     if (selectedOption === quizData[currentQuiz].correct) {
        score++; // Increment score only once
    }
   
    // Move to the next question
    if (currentQuiz < quizData.length - 1) {
        currentQuiz++; // Move to the next question
        document.querySelectorAll(".answer").forEach((radio) => (radio.checked = false));
        loadQuiz(); // Load the next question
    } else {
        endQuiz(); // End the quiz after the last question
    }
});

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        // Check if time has run out
        if (timeLeft <= 0) {
            clearInterval(timer);
            endQuiz(true); // End quiz automatically if time runs out
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.innerHTML = `Time Left: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function endQuiz(timeUp = false) {
    clearInterval(timer);

    const participantName = document.getElementById('name').value;  // Get participant's name

    let resultMessage = `${timeUp ? 'Time is up! ' : ''}Your score: ${score}/${quizData.length} correct answers.`;

    // Check if all answers are correct
    if (score === quizData.length) {
        resultMessage = `Congratulations ${participantName}! 🎉\nYou scored ${score}/${quizData.length} and won the quiz! Thank you for participating!`;
    } else {
        resultMessage = `Thank you for participating, ${participantName}!\nYou scored ${score}/${quizData.length}. Better luck next time!`;
    }
    quizBox.innerHTML = `
        <div class="result">
            <h2>${resultMessage}</h2>
        </div>`;
}
