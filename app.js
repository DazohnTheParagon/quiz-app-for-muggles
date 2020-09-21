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
            question: 'What is the model of the first broom Harry ever receives? is the current year?',
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
                '2019',
                '2005'
            ],
            correctAnswer: 'Weasleys\’ Wizard Wheezes'
        }
    ],
    quizStarted: false,
    questionNumber: 0,
    score: 0
};

// Opening page to the quiz
const openingPage = function () {
    return `<h2>Welcome to the Harry Potter Quiz</h2>
    <p>Start the quiz to test your Harry Potter knowledge!</p>
    <button id="generate">Start Quiz</button>
    `;
}
// Begins and generates quiz question
const quizGenerator = function () {
    // if (store.questionNumber <= 4) {
    $('main').on('click', "#generate", function (event) {
        store.quizStarted = true;
        let question = questionTemp(store.questions, store.questionNumber);
        render(question);
        console.log(store.questions[store.questionNumber])
    })

    // if we are at the end show the results
    // } else {
    //   null
    // }
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
            <input type="radio" id="${item[num].answers[i]}" name="answer" value="${item[num].answers[i]}">
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

// compares the users answer to the answer key for result
const checkAnswer = function () {
    $('main').on('submit', "form", function (event) {
        event.preventDefault();
        console.log(store.questionNumber);
        let currentQuestion = store.question[store.questionNumber];
        let answer = $('input[name=answer]:checkd').val();

        // checks for the correct answer
        if (currentQuestion === answer) {
            store.correctAnswer += 1;
            let showResult = `<div class="correct">
          <h2>Your correct!</h2>
          <p>Outstanding! You have answered ${store.checkAnswer} out of ${store.questionNumber + 1} correct so far.</p>
          <button id="next">Next Question</button>
        </div>`;
        } else {
            let showResult = `<div class="incorrect">
          <h2>Your incorrect!</h2>
          <p>Sorry! You have answered ${store.checkAnswer} out of ${store.questionNumber + 1} correct so far.</p>
          <button id="next">Next Question</button>
        </div>`;
        }
        render(showResult);
    });
}


// Render function
const render = (html) => $('main').html(html);

// Where all of our functions will be ran from
function main() {
    quizGenerator();
    checkAnswer();
    let startPage = openingPage();
    render(startPage);

}

$(main);
