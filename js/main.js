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
let cards; // Array of 36 shuffled card objects
let firstCard; //first card clicked (card object) or null
let secondCard;
let ignoreClicks; 
let score;
let mins;
let seconds;
let interval;

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
  card.addEventListener('click', handleChoice) //ALSO BEGIN STOPWATCH WHEN CARD CLICKED
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
  clearInterval(interval);
  interval = setInterval(stopwatch, 1000);

  cards.forEach(function(card, idx){
    const colorDiv = document.getElementById(idx);
    //colorDiv.setAttribute('style', `background-color: ${cards[idx].hex}` ) //displays colors
    const hex = (card.matched || card === firstCard) ? card.hex : NULL_CARD;
    colorDiv.hex = hex;
    colorDiv.setAttribute('style', `background-color: ${colorDiv.hex}`); //sets the board to default gray 
  });
  //instrEl.style.visibility = true; //hide instruction when game is in play
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
    secondsEl.innerHTML = '0' + 0;
  }
  if (mins >9){
    minsEl.innerHTML = mins;
  }
  render();
}

function handleChoice(evt) {
  const cardIdx = parseInt(evt.target.id); 
  cardEl[cardIdx].style.backgroundColor = cards[cardIdx].hex; // !!!!DONT TOUCH !!!!
  
  if (isNaN(cardIdx) || ignoreClicks) return;
  let secondCard = cards[cardIdx]; //NEW added in .hex
  if (firstCard){
    if (firstCard.hex === secondCard.hex) { 
      firstCard.matched = secondCard.matched = true;
      renderScore();
    } else {
      
      //set the card to true so it'll show for one second
      //thisTimeout = setTimeout(function(){
       // secondTimer();
        //firstCard.matched = secondCard.matched = true; //this line makes the first choice null and the second choice doesnt show up until you click
       // console.log(cards[cardIdx])
       // clearTimeout(thisTimeout);
      //}, 1000);
    }
    firstCard = null;
  } else {
    firstCard = secondCard;
  }
  //timer for both unmatched cards to show temp.
  function secondTimer() {
    clearTimeout(thisTimeout);
    firstCard.matched = true;
    secondCard.matched = true;
  }
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

//OLD SHUFFLE FUNCTION 
function shuffleCards(arr) {
  let m = arr.length;
  while(m !== 0) {
    let randIdx = Math.floor(Math.random() * m--);
    //use temporary variable to swap index 
    let tmp = arr[m];
    arr[m] = arr[randIdx];
    arr[randIdx] = tmp;
  }
  return arr;
}

function renderScore(){
  if (score === 17) {
    scoreEl.innerText = `Completed board in ${getTime}`;
  } else {
    scoreEl.innerHTML = `Score: ${++score}`;
  }
  render();//might need to all render here???? 
}

