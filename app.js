const CARDS = [
	{
		name: 'fries',
		img: 'img/fries.png',
	},
	{
		name: 'hotdog',
		img: 'img/hotdog.jpg',
	},
	{
		name: 'icecreem',
		img: 'img/icecreem.png',
	},
	{
		name: 'cheeseburger',
		img: 'img/cheeseburger.jpg',
	},
	{
		name: 'milkshake',
		img: 'img/milkshake.jpg',
	},
	{
		name: 'pizza',
		img: 'img/pizza.png',
	},
	{
		name: 'fries',
		img: 'img/fries.png',
	},
	{
		name: 'hotdog',
		img: 'img/hotdog.jpg',
	},
	{
		name: 'icecreem',
		img: 'img/icecreem.png',
	},
	{
		name: 'cheeseburger',
		img: 'img/cheeseburger.jpg',
	},
	{
		name: 'milkshake',
		img: 'img/milkshake.jpg',
	},
	{
		name: 'pizza',
		img: 'img/pizza.png',
	},
];

CARDS.sort(() => 0.5 - Math.random()); // Sort Array randomly each time

const gridContainer = document.getElementById('grid');
const matchEl = document.createElement('div');
const winEl = document.getElementById('win-el');
const scoreEl = document.getElementById('score');
const restartEl = document.getElementById('restart');

matchEl.setAttribute('class', 'match-el');
let matchText = document.createTextNode('You Get Match');
matchEl.appendChild(matchText);
document.body.prepend(matchEl);

function createCard() {
	for (let i = 0; i < CARDS.length; i++) {
		const imgEl = document.createElement('img');
		// imgEl.setAttribute('src', CARDS[i].img);
		imgEl.setAttribute('src', 'img/blank.png');
		imgEl.setAttribute('data-id', i);
		imgEl.addEventListener('click', flipCard);

		gridContainer.append(imgEl);
	}
}

createCard();

// all let Variables
let cardsChosen = [];
let cardsChosenID = [];
let matchedCards = [];

let result = 0;

function flipCard() {
	const imgCardId = this.getAttribute('data-id');

	this.setAttribute('src', CARDS[imgCardId].img);
	cardsChosenID.push(imgCardId);

	cardsChosen.push(CARDS[imgCardId].name);
	this.removeEventListener('click', flipCard);

	if (cardsChosen.length === 2) {
		setTimeout(checkMatch, 650);
	}
}
const allImages = document.querySelectorAll('#grid img');
function checkMatch() {
	const cardOne = cardsChosen[0];
	const cardTwo = cardsChosen[1];

	const cardOneID = cardsChosenID[0];
	const cardTwoID = cardsChosenID[1];

	if (cardOne == cardTwo) {
		allImages[cardOneID].setAttribute('src', 'img/white.png');
		allImages[cardOneID].removeEventListener('click', flipCard);
		allImages[cardTwoID].setAttribute('src', 'img/white.png');
		allImages[cardTwoID].removeEventListener('click', flipCard);

		matchedCards.push(cardsChosen);

		result += 5;
		scoreEl.textContent = `${result} points`;

		matchEl.classList.add('active');
		setTimeout(() => matchEl.classList.remove('active'), 2500);
	} else {
		setTimeout(() => {
			allImages[cardOneID].setAttribute('src', 'img/blank.png');
			allImages[cardOneID].addEventListener('click', flipCard);
			allImages[cardTwoID].setAttribute('src', 'img/blank.png');
			allImages[cardTwoID].addEventListener('click', flipCard);
		}, 500);
	}

	cardsChosen = [];
	cardsChosenID = [];

	if (matchedCards.length === CARDS.length / 2) {
		winEl.classList.add('active');
		setTimeout(() => winEl.classList.remove('active'), 10000);
	}
}

// restart the game
restartEl.addEventListener('click', restartGame);

function restartGame() {
	cardsChosen = [];
	cardsChosenID = [];
	matchedCards = [];
	allImages.forEach((img) => {
		img.setAttribute('src', 'img/blank.png');
		img.addEventListener('click', flipCard);
	});
	CARDS.sort(() => 0.5 - Math.random());
}
