/*----- constants -----*/



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


  render();
}

function render() {

}
function handleCard() {
  console.log("card clicked");
  console.log(this);
}