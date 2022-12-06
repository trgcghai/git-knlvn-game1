const flipCards = document.querySelectorAll(".thecard");
const backCard = document.querySelectorAll(".back");
const scoreBoard = document.querySelector('.score');

let flippedCard = [];
let beingFlippedCard = [];
let numOfFlippedCards = 0;
let score = 0;
let listCardsFull = [
    {
        url: './assets/picture/hinh0.jpg',
        value: '0'
    },
    {
        url: './assets/picture/hinh1.jpg',
        value: '1'
    },
    {
        url: './assets/picture/hinh2.jpg',
        value: '2'
    },
    {
        url: './assets/picture/hinh3.jpg',
        value: '3'
    },
    {
        url: './assets/picture/hinh4.jpg',
        value: '4'
    },
    {
        url: './assets/picture/hinh5.jpg',
        value: '5'
    },
    {
        url: './assets/picture/hinh6.jpg',
        value: '6'
    },
    {
        url: './assets/picture/hinh7.jpg',
        value: '7'
    },
    {
        url: './assets/picture/hinh8.jpg',
        value: '8'
    },
    {
        url: './assets/picture/hinh9.jpg',
        value: '9'
    }
]

//* đảo vị trí các phần tử trong arr
function shuffle(arr) {
    return arr.sort(function () {
        return 0.5 - Math.random();
    });
}

//* hàm sắp xếp vị trí của card lên html
function renderCard() {
    let listCards = [];
    let isAssign = [];
    let idx;
    for (let i = 0; i < 9; i++) {
        isAssign[i] = false;
    }
    console.log(listCardsFull.length);

    for (let i = 0; i < 6; i++) {
        idx = Math.floor(Math.random() * listCardsFull.length);
        while (isAssign[idx]) {
            idx = Math.floor(Math.random() * listCardsFull.length);
        }  
        listCards[i] = listCardsFull[idx];
        isAssign[idx] = true;
        console.log(listCards[i]);
    }
    console.log(listCards.length);
    listCards = [...listCards, ...listCards];
    listCards = shuffle(listCards);
    console.log(listCards.length);
    for (let i = 0; i < backCard.length; i++) {
        const c = listCards[i];
        const img = document.createElement('img');

        img.src = c.url;
        img.alt = c.value;
        img.style.width = '100%';
        img.style.height = '100%';
        flipCards[i].classList.add(`${c.value}`)
        backCard[i].appendChild(img);
    }
}

//* hàm xử lí việc lật card
function flipCard(card) {
    if (card.classList.contains('selected') || card.classList.contains('flipped')) {
        return;
    } else {
        card.classList.add('flipped');
        flippedCard[numOfFlippedCards] = card.classList[1];
        beingFlippedCard[numOfFlippedCards] = card;
        numOfFlippedCards++;
        if (numOfFlippedCards === 2) {
            numOfFlippedCards = 0;
            checkIfMatch();
        }
    }
}

//* kiểm tra trùng khớp 
function checkIfMatch() {
    if (flippedCard[0] === flippedCard[1]) {
        score += 10;
        delClickEvent();
        checkIfWin();
    } else {
        if (score > 0) {
            score -= 5;            
        }
        unflipCard();
    }
    scoreBoard.innerHTML = `${score}`;
}

//* hàm xoá sự kiện click trên thẻ đã lật đúng
function delClickEvent() {
    beingFlippedCard[0].classList.add('selected');
    beingFlippedCard[1].classList.add('selected');
}

//* lật card lại khi sai
function unflipCard() {
    setTimeout(function() {
        beingFlippedCard[0].classList.remove('flipped');
        beingFlippedCard[1].classList.remove('flipped');
    }, 400)
}

//* hàm kiểm tra win game 
function checkContainSelected() {
    for (const flipCard of flipCards) {
        if (flipCard.classList.length !== 4) {
            return false;
        }
    }
    return true;
}
function checkIfWin() {
    if (checkContainSelected()) {
        setTimeout(function() {
            // TODO viết hàm xử lí sau khi thắng game
            afterGame();
        }, 500)
    }
}

//* hàm xử lí sau khi thắng
function afterGame() {
    const afterWin = document.getElementById('js-afterWin');
    const afterWin_score = document.getElementById('js-afterWin__score');

    afterWin.style.display = 'flex';
    afterWin_score.innerHTML = `${score}`;
}

//* gọi hàm sắp xếp card
renderCard();

//* delay trước khi vào trò chơi
for (let i = 0; i < flipCards.length; i++) {
    flipCards[i].classList.add('flipped');
}
setTimeout(function() {
    for (let i = 0; i < flipCards.length; i++) {
        flipCards[i].classList.remove('flipped');
    }
}, 2000)
