/*----- constants -----*/
const cardArr = ['red','orange', 'yellow', 'green', 'blue','purple','pink',
'red','orange', 'yellow', 'green', 'blue','purple','pink']


/*----- app's state (variables) -----*/
let board; //An array of the board cards
let timer; //
let score;






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

  shuffleCards(cardArr); //Call shuffleCards to shuffle the colors in the array for each new board
  render();
}

function render() {

}
function handleCard(evt) {
  evt.target.style.backgroundColor = 'red';
}
function shuffleCards(arr) {
  let currentIdx = arr.length, randomIdx;
  while (currentIdx !== 0){
    randomIdx = Math.floor(Math.random() * currentIdx);
    currentIdx--;

    [arr[currentIdx], arr[currentIdx]] = [arr[randomIdx], arr[currentIdx]];
  }
  return arr;
}