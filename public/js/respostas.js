var answers = {};

var question_1 = document.getElementById('question-1');
var question_2 = document.getElementById('question-2');
var question_3 = document.getElementById('question-3');
var question_4 = document.getElementById('question-4');
var question_5 = document.getElementById('question-5');
var question_6 = document.getElementById('question-6');
var question_7 = document.getElementById('question-7');
var question_8 = document.getElementById('question-8');
var question_9 = document.getElementById('question-9');
var question_10 = document.getElementById('question-10');
var question_11 = document.getElementById('question-11');
var question_12 = document.getElementById('question-12');
var question_13 = document.getElementById('question-13');
var question_14 = document.getElementById('question-14');
var question_15 = document.getElementById('question-15');

function storeAnswer(question_number, event) {
    if (event.target.type === 'radio') {
        answers['question' + question_number] = parseInt(event.target.value);
        console.log('Pergunta ' + question_number + ':', event.target.value + ' pontos');
        console.log('Respostas atuais:', answers);
    }
}

question_1.addEventListener('click', function(event) {
    storeAnswer(1, event);
});
question_2.addEventListener('click', function(event) {
    storeAnswer(2, event);
});
question_3.addEventListener('click', function(event) {
    storeAnswer(3, event);
});
question_4.addEventListener('click', function(event) {
    storeAnswer(4, event);
});
question_5.addEventListener('click', function(event) {
    storeAnswer(5, event);
});
question_6.addEventListener('click', function(event) {
    storeAnswer(6, event);
});
question_7.addEventListener('click', function(event) {
    storeAnswer(7, event);
});
question_8.addEventListener('click', function(event) {
    storeAnswer(8, event);
});
question_9.addEventListener('click', function(event) {
    storeAnswer(9, event);
});
question_10.addEventListener('click', function(event) {
    storeAnswer(10, event);
});
question_11.addEventListener('click', function(event) {
    storeAnswer(11, event);
});
question_12.addEventListener('click', function(event) {
    storeAnswer(12, event);
});
question_13.addEventListener('click', function(event) {
    storeAnswer(13, event);
});
question_14.addEventListener('click', function(event) {
    storeAnswer(14, event);
});
question_15.addEventListener('click', function(event) {
    storeAnswer(15, event);
});

function totalScore() {
    var total = 
        (answers.question1 || 0) +
        (answers.question2 || 0) +
        (answers.question3 || 0) +
        (answers.question4 || 0) + 
        (answers.question5 || 0) +
        (answers.question6 || 0) +
        (answers.question7 || 0) +
        (answers.question8 || 0) +
        (answers.question9 || 0) +
        (answers.question10 || 0) +
        (answers.question11 || 0) +
        (answers.question12 || 0) +
        (answers.question13 || 0) +
        (answers.question14 || 0) +
        (answers.question15 || 0);
    
    return total;
}

function getRedirectPage(score) {
    let url;
    if (score <= 15) {
        url = '/respostas1';
    } else if (score <= 30) {
        url = '/respostas2';
    } else if (score <= 45) {
        url = '/respostas3';
    } else {
        url = '/respostas4';
    }
    window.location.href = url;
}

function getInfoBasedOnScore() {
    var score = totalScore();
    var info = '';
    
    if (score <= 15) {
        info = "Parabéns! Seus cabelos estão saudáveis!";
    } else if (score <= 30) {
        info = "Seus cabelos estão levemente danificados. Alguns cuidados extras ajudarão!";
    } else if (score <= 45) {
        info = "Atenção! Seus cabelos precisam de tratamentos intensivos.";
    } else {
        info = "Cuidado! Seus cabelos estão muito danificados e precisam de atenção urgente!";
    }
    
    return info;
}

function isQuizComplete() {
    var totalAnswered = Object.keys(answers).length;
    return totalAnswered === 15;
}

var submit1 = document.getElementById('submit1');
var submit2 = document.getElementById('submit2');
var submit3 = document.getElementById('submit3');
var submit4 = document.getElementById('submit4');
var submit5 = document.getElementById('submit5');
var submit6 = document.getElementById('submit6');
var submit7 = document.getElementById('submit7');
var submit8 = document.getElementById('submit8');
var submit9 = document.getElementById('submit9');
var submit10 = document.getElementById('submit10');
var submit11 = document.getElementById('submit11');
var submit12 = document.getElementById('submit12');
var submit13 = document.getElementById('submit13');
var submit14 = document.getElementById('submit14');
var submit15 = document.getElementById('submit15');

function nextQuestion(question_number) {
    var current_question_number = question_number - 1;
    var question_str = question_number.toString();
    var current_question_str = current_question_number.toString();

    var el = document.getElementById('question-' + question_str);
    var el2 = document.getElementById('question-' + current_question_str);

    el.style.display = "block";
    el2.style.display = "none";
}

function growProgressBar(percentage_width) {
    var bar = document.getElementById("progress_bar");
    if (bar) {
        bar.style.width = percentage_width;
    }
}

submit1.addEventListener('click', function() {
    nextQuestion(2);
    growProgressBar('6.67%');
});
submit2.addEventListener('click', function() {
    nextQuestion(3);
    growProgressBar('13.33%');
});
submit3.addEventListener('click', function() {
    nextQuestion(4);
    growProgressBar('20%');
});
submit4.addEventListener('click', function() {
    nextQuestion(5);
    growProgressBar('26.67%');
});
submit5.addEventListener('click', function() {
    nextQuestion(6);
    growProgressBar('33.33%');
});
submit6.addEventListener('click', function() {
    nextQuestion(7);
    growProgressBar('40%');
});
submit7.addEventListener('click', function() {
    nextQuestion(8);
    growProgressBar('46.67%');
});
submit8.addEventListener('click', function() {
    nextQuestion(9);
    growProgressBar('53.33%');
});
submit9.addEventListener('click', function() {
    nextQuestion(10);
    growProgressBar('60%');
});
submit10.addEventListener('click', function() {
    nextQuestion(11);
    growProgressBar('66.67%');
});
submit11.addEventListener('click', function() {
    nextQuestion(12);
    growProgressBar('73.33%');
});
submit12.addEventListener('click', function() {
    nextQuestion(13);
    growProgressBar('80%');
});
submit13.addEventListener('click', function() {
    nextQuestion(14);
    growProgressBar('86.67%');
});
submit14.addEventListener('click', function() {
    nextQuestion(15);
    growProgressBar('93.33%');
});

submit15.addEventListener('click', function() {
    growProgressBar('100%');
    
    if (!isQuizComplete()) {
        var answered = Object.keys(answers).length;
        alert('Por favor, responda todas as perguntas! Você respondeu ' + answered + ' de 15.');
        return;
    }
    
    var score = totalScore();
    var info = getInfoBasedOnScore();
    var redirectPage = getRedirectPage(score);
    
    console.log('Pontuação total:', score + '/60');
    console.log('Redirecionando para:', redirectPage);
    
    var printTotalScore = document.getElementById("printtotalscore");
    var printScoreInfo = document.getElementById("printscoreinfo");
    
    if (printTotalScore) {
        printTotalScore.innerHTML = score + '/60';
    }
    if (printScoreInfo) {
        printScoreInfo.innerHTML = info;
    }
    
    setTimeout(function() {
        window.location.href = redirectPage;
    }, 2000);
});

function showAllAnswers() {
    console.log('=== RESUMO DO QUIZ ===');
    console.log('Respostas:', answers);
    console.log('Total respondido:', Object.keys(answers).length + '/15');
    console.log('Pontuação:', totalScore() + '/60');
    console.log('Categoria:', getInfoBasedOnScore());
    console.log('====================');
}
