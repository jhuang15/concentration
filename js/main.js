/*----- constants -----*/
const CARD_DECK = [
  {hex:'#F74305', matched: false},
  {hex:'#F54D00', matched: false},
  {hex:'#F7BD05', matched: false},
  {hex:'#DEA60B', matched: false},
  {hex:'#F8CA81', matched: false},
  {hex:'#F5E801', matched: false},
  {hex:'#D7F884', matched: false},
  {hex:'#8CF08B', matched: false},
  {hex:'#0BDE51', matched: false},
  {hex:'#6BFA00', matched: false},
  {hex:'#00EDFA', matched: false},
  {hex:'#8BB6F0', matched: false},
  {hex:'#0567FA', matched: false},
  {hex:'#8304D6', matched: false},
  {hex:'#DBB3F5', matched: false},
  {hex:'#FAAAE5', matched: false},
  {hex:'#F88681', matched: false},
  {hex:'#F8886B', matched: false},
];
const NULL_CARD = '#D5D5D5';

/*----- app's state (variables) -----*/
let cards; 
let firstCard; 
let secondCard;
let score;
let mins;
let seconds;
let interval;
let getTime; 

/*----- cached element references -----*/
const cardEl = [...document.querySelectorAll('.card')];
const playBtn = document.getElementById('play-btn');
const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');
const secondsEl = document.getElementById('seconds');
const minsEl = document.getElementById('mins');

/*----- event listeners -----*/
playBtn.addEventListener('click', init);
cardEl.forEach (function (card) {
  card.addEventListener('click', handleChoice)
});

/*----- functions -----*/
init();

function init() {
  firstCard = null; 
  secondCard = null;
  ignoreClicks = false;
  cards = getShuffledCards();
  score = 0; 
  mins = 00;
  seconds = 00;
  render();
  }

function render() {
  cards.forEach(function(card, idx){
    const colorDiv = document.getElementById(idx);
    const hex = (card.matched || card === firstCard) ? card.hex : NULL_CARD;
    colorDiv.hex = hex;
    colorDiv.setAttribute('style', `background-color: ${colorDiv.hex}`); 
  });
}

function stopwatch() {
  seconds++;
  if (seconds <= 9){
    secondsEl.innerHTML = '0' + seconds;
  }
  if (seconds > 9){
    secondsEl.innerHTML = seconds;
  }
  if (seconds > 60) {
    mins++;
    minsEl.innerHTML = '0' +mins;
    seconds = 0;
    secondsEl.innerHTML = '0' + seconds;
  }
  if (mins >9){
    minsEl.innerHTML = mins;
  }
  getTime = seconds;
  render();
}

function handleChoice(evt) {
  const cardIdx = parseInt(evt.target.id); 
  cardEl[cardIdx].style.backgroundColor = cards[cardIdx].hex; 
  let secondCard = cards[cardIdx];
  if (firstCard){
    if (firstCard.hex === secondCard.hex) { 
      firstCard.matched = secondCard.matched = true;
      renderScore();
    } 
    firstCard = null;
  } else {
    firstCard = secondCard;
  }
  clearInterval(interval);
  interval = setInterval(stopwatch, 1000);
  render();
}

function getShuffledCards() {
  let tempCards = [];
  let cards = [];
  for (let card of CARD_DECK){
    tempCards.push({...card}, {...card});
  }
  while (tempCards.length) {
    let rndIdx = Math.floor(Math.random() *tempCards.length);
    let card = tempCards.splice(rndIdx, 1)[0];
   cards.push(card);
  }
  return cards;
}

function renderScore(){
  if (score === 17) {
    scoreEl.innerText = `Completed board in 0${mins}:${seconds}`;
    clearInterval(interval);
  } else {
    scoreEl.innerHTML = `Score: ${++score}`;
  }
  render();
}

