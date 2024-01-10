const container = document.querySelector(".js-content");
const champion = document.querySelector('.js-winner');
const totalWins = document.querySelector('.js-winner-counter');
const totalXwins = document.querySelector('.js-xwins');
const totalOwins = document.querySelector('.js-owins');
// console.log(container)


const wins = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 5, 9],
    [3, 5, 7],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
];



let historyX = [];
let historyO = [];
let oWins = 0;
let xWins = 0;
totalOwins.textContent = oWins;
totalXwins.textContent = xWins;
const isEndGame = (historyX.length + historyO.length) === 9;
let player = "X";

function createMarkup() {
    let markup = '';
    for (let i = 1; i < 10; i += 1) {
        markup += `<div class="item js-item" data-id="${i}"></div>`;
    };

    container.innerHTML = markup;
    return markup
}

createMarkup()
container.addEventListener("click", onClick);

function onClick(evt) {
    const { target } = evt;
    if (!target.classList.contains("js-item") || evt.target.textContent) {
        return;
    };

    let winner = false;
    const gameId = Number(target.dataset.id);
    if (player === "X") {
        historyX.push(gameId);
        winner = isWinner(historyX);
    }
    else {
        historyO.push(gameId);
        winner = isWinner(historyO);
    }
    // console.log("O", historyO);
    // console.log("X", historyX);


    target.textContent = player;

    if (winner) {
        champion.innerHTML = `Congratulation! ${player} is winner!!!`
        if (player === "X") {
            xWins += 1;
            totalXwins.textContent = xWins;
        }
        if (player === "O") {
            oWins += 1;
            totalOwins.textContent = oWins;
        }
        if (historyX.length + historyO.length === 9) {
            champion.innerHTML = `No winner this time! Play a new game`;
            resetGame()
        };
        resetGame()
    };

    player = player === "X" ? "O" : "X";
}

function isWinner(arr) {
    return wins.some((numbers) => numbers.every((gameId) => arr.includes(gameId)));
};

function resetGame() {
    historyX = [];
    historyO = [];
    player = "X";
    createMarkup()
    setTimeout(() => {
        champion.innerHTML = "";
    }, 2000);

}