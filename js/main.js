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
let timeLeft;

/*----- cached element references -----*/
const cardEl = [...document.querySelectorAll('.card')];
const playBtn = document.getElementById('play-btn');
const timeEl = document.getElementById('time');

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

  render();
}

function render() {
 // CARD_DECK.forEach(function(card, idx) {
  //  const imgEl = document.getElementById(idx);
  //  const src = (card.matched || card === firstCard) ? CARD_DECK[idx] : CARD_BACK;
  //});
  //shuffleCards(CARD_DECK); //Call shuffleCards to shuffle the colors in the array for each new board

  let timeoutId = setInterval(countdown, 1000);

  cards.forEach(function(card, idx){
    const colorDiv = document.getElementById(idx);
    
    //colorDiv.setAttribute('style', `background-color: ${cards[idx].hex}` ) //displays colors
    const hex = (card.matched || card === firstCard) ? card.hex : NULL_CARD;
    colorDiv.hex = hex;
    colorDiv.setAttribute('style', `background-color: ${colorDiv.hex}`); //sets the board to default gray 
    
  });
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

//MY SHUFFLE FUNCTION 
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




function handleChoice(evt) {
  const cardIdx = parseInt(evt.target.id); 

  cardEl[cardIdx].style.backgroundColor = cards[cardIdx].hex; // !!!!DONT TOUCH !!!!
  //console.log(cardEl[cardIdx]);

  if (isNaN(cardIdx) || ignoreClicks) return;
  const secondCard = cards[cardIdx]; //NEW added in .hex
  if (firstCard){
   
    if (firstCard.hex === secondCard.hex) { //new changed color to hex
      firstCard.matched = secondCard.matched = true;
      console.log('firstCard.color -->'+firstCard.hex);
      console.log('secondCard.color -->'+secondCard.hex);
      console.log('firstCard.matched -->'+firstCard.matched);
      console.log('secondCard.matched -->'+secondCard.matched);
    } else {
      console.log('numBad++');
    }
    firstCard = null;
    console.log('firstCard=null -->'+firstCard);
  } else {
    firstCard = secondCard;
    console.log('firstCard=Secondcard -->'+firstCard);
  }
  
  render();
}
/*
//Function takes in an array parameter, while the array length is NOT empty 
//run the random function, decreasing the length each loop and swap indexs 
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
*/
function countdown() {
  timeLeft = 30; //move this later, timer wont run
  if (timeLeft === -1) {
    clearTimeout(timeoutId);
    flipCards(); //Invoke function to flip cards over and start timing game
  } else {
    timeEl.innerHTML = timeLeft + ' seconds remaining';
    timeLeft--;
  }
}

function flipCards () {

}

