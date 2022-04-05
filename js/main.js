/*----- constants -----*/
const CARD_DECK = ['#F74305','#F74305', //red
  '#F54D00','#F54D00', //orange red
  '#F7BD05','#F7BD05', //orange
  '#DEA60B','#DEA60B', //mustard yellow
  '#F8CA81','#F8CA81', //beige
  '#F5E801','#F5E801', //yellow
  '#D7F884','#D7F884', //lime yellow
  '#8CF08B','#8CF08B', //light green
  '#0BDE51','#0BDE51', //green
  '#6BFA00','#6BFA00', //neon green
  '#00EDFA','#00EDFA', //light blue
  '#8BB6F0','#8BB6F0', //dusty light blue
  '#0567FA','#0567FA', //blue
  '#8304D6','#8304D6', //purple 
  '#DBB3F5','#DBB3F5', //light purple
  '#FAAAE5','#FAAAE5', //light pink
  '#F88681','#F88681', //blush pink
  '#F8886B','#F8886B', //salmon
  '#EC05FA','#EC05FA'] //hot pink

/*----- app's state (variables) -----*/
let board; //An array of the board cards
let timer; //
let score;
let firstCard, secondCard;
let flipped;

/*----- cached element references -----*/
const cards = document.querySelectorAll('.card');

/*----- event listeners -----*/
cards.forEach (function (card) {
  card.addEventListener('click', handleCard);
});

/*----- functions -----*/
init();

function init() {
  timer = '';

  shuffleCards(CARD_DECK); //Call shuffleCards to shuffle the colors in the array for each new board
  render();
}

function render() {

}

function handleCard(evt) {
  

  evt.target.style.backgroundColor = CARD_DECK[1];
}

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