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