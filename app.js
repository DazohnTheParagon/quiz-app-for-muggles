// test data
const store = {
    questions: [
        {
            question: 'What are non-wizards called?',
            answers: [
                'Weaklings',
                'Muggles',
                'Chimps',
                'Mudbloods'
            ],
            correctAnswer: 'Muggles'
        },
        {
            question: 'In the Sorcerer\'s Stone, what chess piece did Ron Wesley play as when sacraficing himself for Harry?',
            answers: [
                'King',
                'Pond',
                'Bishop',
                'Knight'
            ],
            correctAnswer: 'Knight'
        },
        {
            question: 'What house in Hogwarts did Harry belong to?',
            answers: [
                'Hufflepuff',
                'Slytherin',
                'Gryffindor',
                'Ravenclaw'
            ],
            correctAnswer: 'Gryffindor'
        },
        {
            question: 'What is the model of the first broom Harry ever receives?',
            answers: [
                'Cleansweep One',
                'Hoover',
                'Firebolt',
                'Nimbus 2000'
            ],
            correctAnswer: 'Nimbus 2000'
        },
        {
            question: 'What is the name of Fred and George\’s joke shop?',
            answers: [
                'Weasley Joke Emporium',
                'Weasleys\’ Wizard Wheezes',
                'Fred & George\’s Wonder Emporium',
                'Zonko\’s Joke Shop'
            ],
            correctAnswer: 'Weasleys\’ Wizard Wheezes'
        }
    ],
    quizStarted: false,
    questionNumber: 0,
    score: 0
};


// Generates questions or show results
const handleQuiz = function () {
    // if we have not reached the last question, gernerate next question
    if (store.questionNumber <= 4) {
        generateQuestion();
    } else {
        // if we are at the end, show results
        results();
    }
}

const generateQuestion = function () {
    $('main').on('click', "#generate", function (event) {
        store.quizStarted = true;
        let question = questionTemp(store.questions, store.questionNumber);
        render(question);
        console.log(store.questions[store.questionNumber])
    })
}



// Template for each question
const questionTemp = function (item, num) {

    // output variable
    let htmlOutput = `<p>${item[num].question}</p>`;

    // add the oppening form to the output variable
    htmlOutput += `<form>`

    // add each one of the answers to the form 
    for (let i = 0; i < item[num].answers.length; i++) {
        htmlOutput += `
        <div>
        <input type="radio" id="${item[num].answers[i]}" name="answer" value="${item[num].answers[i]}" required>
        <label for="${item[num].answers[i]}">${item[num].answers[i]}</label>
        </div>`
    }

    // add closing form and submit button to the output variable 
    htmlOutput += `
    <button type="submit">Submit</button>
    <p>${num + 1} of 5</p>
    </form>`

    // return the output variable for rendering 
    return htmlOutput
}


// Compares the users answer to the answer key for result
const checkAnswer = function () {
    $('main').on('submit', "form", function (event) {
        event.preventDefault();
        let currentQuestion = store.questions[store.questionNumber];
        let answer = $('input[name=answer]:checked').val()
        console.log(store.questionNumber)
        // checks for the correct answer
        if (currentQuestion.correctAnswer === answer) {
            store.score += 1;
            render(congrats());
        } else {
            render(sorry());
        }
        store.questionNumber++;
        console.log(store.questionNumber)
    });
}

// Shows quiz results
const results = function () {
    $('main').on('click', "#generate", function (event) {
        event.preventDefault();
        render(resultTemplate());
    })
}


// Starts the quiz over
const startOver = function () {
    $('main').on('click', "#restart", function (event) {
        store.quizStarted = false;
        store.questionNumber = 0;
        store.score = 0;
        render(openingPage);
    })
}


// Opening page to the quiz
function openingPage() {
    return `<h2>Welcome to the Harry Potter Quiz</h2>
    <p>Start the quiz to test your Harry Potter knowledge!</p>
    <button id="generate">Start Quiz</button>
    `;
}


// Html template for the correct answer
function congrats() {
    return `<div class="correct">
    <h2>You are correct!</h2>
    <p>Outstanding! You have answered ${store.score} out of ${store.questionNumber + 1} correct so far.</p>
    <button id="generate">Next</button>
    </div>`;
}


// Html template for the wrong answer
function sorry() {
    return `<div class="incorrect">
    <h2>You are incorrect!</h2>
    <p>Sorry! You have answered ${store.score} out of ${store.questionNumber + 1} correct so far.</p>
    <button id="generate">Next</button>
  </div>`;
}

// Result html template
function resultTemplate() {
    return `<div>
    <h2>Out of 5 questions:</h2>
    <p>You've answered ${store.score} correct<br>and ${5 - store.score} incorrect.</p>
    <button id="restart">Start Over</button>
    </div>`;
}





// Render function
const render = (html) => $('main').html(html);

// Where all of our functions will be ran
function main() {
    let startPage = openingPage();
    render(startPage);
    handleQuiz();
    checkAnswer();
    startOver();
}

$(main);
