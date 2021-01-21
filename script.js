
class Config {
    constructor() {
        this.word = 'POSAO';
        this.letter = '';
        this.arr = [];
        this.msgSuccess = 'BRAVO!';
        this.duration = window.innerWidth < 800 ? 2 : 4;
        this.shakeTime = 2000;
    }
}

class Box {
    constructor(name, className, specialCharacter) {
        this.name = name;
        this.class = className;
        this.specialCharacter = specialCharacter;
    }
}

let stopWatchInterval;
let counter = 0;
let config;
let milisecond;
let second;

function shaker() {
    let int = setInterval(() => {
        for (let c = config.arr.length - 1; c > 0; c--) {
            let b = Math.floor(Math.random() * (c + 1));
            let a = config.arr[c];
            config.arr[c] = config.arr[b];
            config.arr[b] = a;
        }
        return draw(config.arr);
    }, 100);

    setTimeout(() => {
        clearInterval(int);
        time();
    }, 2000)
}

function draw(arr) {
    $('#wrapper').html('');
    for (let i in arr) {
        let div = document.createElement('div');
        $(div)
            .addClass(`${arr[i].class} box`)
            .html(`${arr[i].specialCharacter ? arr[i].name : ''}`)
            .click(() => { selectAnswers(arr[i]) })
            .appendTo($('#wrapper'));
    }
}

function startGame() {

    config = new Config();
    for (let i = 0; i < 25; i++) {
        let m = config.word.split('');
        if (i > 9 && i < 15)
            config.arr.push(new Box(m[i - 10], 'ng-repeat-animation specialStyle', true));
        else
            config.arr.push(new Box(i, 'defaultStyle', false));
    }

    counter = 3;
    showCounter(counter);
    draw(config.arr)

    let int = setInterval(() => {
        counter--;
        showCounter(counter);
        if (!counter) {
            clearInterval(int);
            shaker();
            hideCounter();
        }
    }, 1000)
}

function time() {
    second = 0;
    milisecond = 0;
    return stopWatchInterval = setInterval(() => {
        if (milisecond > 99) {
            milisecond = 0;
            second++
        } else
            milisecond++;
        if (second == config.duration) {
            clearInterval(stopWatchInterval);
            startGame(); //start again if time is up
        }
    }, 10)
}

function selectAnswers(letter) {
    if (!letter.specialCharacter || !milisecond)
        return

    config.letter += letter.name;

    if (config.letter.length == config.word.length) {
        if (config.letter == config.word) {
            clearInterval(stopWatchInterval);
            showSuccess();

        } else {
            clearInterval(stopWatchInterval);
            startGame(); //start again wrong inputs
        }
    }
}

function showSuccess() {
    $('#success').css('display', 'flex');
    $('#timer').html(`Vreme: ${second + ':' + milisecond}`);
}

function hideSuccess() {
    $('#success').css('display', 'none');
}

function showCounter(time) {
    $('#counter').css('display', 'flex');
    $('#counter .anim').html(`${time}`);
}

function hideCounter() {
    $('#counter').css('display', 'none');
}

$(document).ready(function () {
    startGame();
});
