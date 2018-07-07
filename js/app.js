/*
 * Create a list that holds all of your cards
 */
let cards = ["diamond","diamond","paper-plane-o","paper-plane-o","anchor","anchor","bolt","bolt","cube","cube","bomb","bomb","leaf","leaf","bicycle","bicycle"];
let sec = 0;
let moves = 0;
let openedCard = [];
let rateStar = "3";
let match = 0;

function restartGame() {
  $("#restart").on("click", function() {
    location.reload();
  });
}
// Count up timer
function pad (val) { return val > 9 ? val : "0" + val;}
setInterval (function() {
  $("#seconds").html(pad(++sec%60));
  $("#minutes").html(pad(parseInt(sec/60,10)));
}, 1000);


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function createCard() {
  let cardList = shuffle(cards);
  cardList.forEach(function(card) {
    $(".deck").append('<li><i class="card fa fa-' + card + '"></i></li>');
  });
}


//add opened cards to OpenedCards list and check if cards are match or not
function findMatchedCard() {
  $(".card").on("click", function() {
    if ($(this).hasClass("open show")) { return; }
    $(this).toggleClass("flipInY open show");
    openedCard.push($(this));
    var len = openedCard.length;
    if(len === 2){
        if(openedCard[0][0].classList[2] === openedCard[1][0].classList[2]){
          openedCard[0][0].classList.add("match");
          openedCard[1][0].classList.add("match");
          moves++;
          removeOpenCards()
          winGame();
        } else {
          openedCard[0][0].classList.add("unmatched");
          openedCard[1][0].classList.add("unmatched");
          setTimeout(removeClasses, 600);
          setTimeout(removeOpenCards, 700);
          moves++;
        }
    }
    moveCounter();
    })
};
function removeOpenCards() {
  openedCard = [];
}
function removeClasses() {
  $(".card").removeClass("show open flipInY bounceIn shake wrong");
  removeOpenCards();
}


function moveCounter(){
    if (moves === 1) {
      $("#movesText").text(" Move");
    } else {
      $("#movesText").text(" Moves");
    }
    $("#moves").text(moves.toString());

    // setting rates based on moves
    if (moves >= 1 && moves <= 12) {
      rateStar = rateStar;
    } else if (moves > 12 && moves <= 22) {
      $("#thirdStar").removeClass("fa-star");
      rateStar = "2";
    } else if (moves > 22) {
      $("#secondStar").removeClass("fa-star");
      rateStar = "1";
    }
}

function winGame() {
  if (match === 16) {
    var modal = document.getElementsByClassName('successPopup');
    var span = document.getElementsByClassName('close');

    modal.style.display = "block";
    span.onclick = function() {
      modal.style.display = "none";
    };
    $("#againButton").on("click", function() {
      location.reload();
    });
  }
}

shuffle(cards);
createCard();
findMatchedCard();
restartGame()
