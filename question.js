
function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }
    this.questionIndex++;
}

Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}


function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}


function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};


function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

// create questions here
var questions = [
    new Question("1.What word starts with E and ends with E but only has one letter in it??", ["Eye", "Else","Envelope", "Ensure"], "Envelope"),
    new Question("2.No sooner spoken than broken. What is it?", ["Happy", "Sad", "Silence", "Enthusiasm "], "Silence"),
    new Question("3.The more you take, the more you leave behind. What am I?", ["Footprint", "Sketchprint"," Fingerprint ", "Handprint"], "Fingerprint"),
    new Question("4.The more there is, the less you see. What am I?", ["Brightness", "Blurness", "Emptyness", "Darkness"], "Darkness"),
    new Question("5.What word of some letters has only one left when two letters are removed?", ["Stone", "Conerstone", "Creamstone", "None"], "Stone")
];

// create quiz
var quiz = new Quiz(questions);

// display quiz
populate();