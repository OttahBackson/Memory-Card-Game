const cards = document.querySelectorAll(".card");
let matchedCard = 0;
let cardOne, cardTwo;
let disableDeck = false;

flipCard = (e) => {
    let clickedCard = e.target; // getting all the clicked card
    if (clickedCard !== cardOne && !disableDeck) {
        clickedCard.classList.add("clicked");
        if (!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".card .back-view img").src;
        let cardTwoImg = cardTwo.querySelector(".card .back-view img").src;
        matchedCards(cardOneImg, cardTwoImg);
    }
}

matchedCards = (img1, img2) =>{
    if (img1 === img2) {
        matchedCard++; //increment method value by 1
        if (matchedCard == 8) {
            setTimeout(() =>{
            return shuffleCard();
            },1000);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return disableDeck = false;
    }
    setTimeout(() =>{
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 500);

    setTimeout(() =>{
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
        cardOne = cardTwo = ""; //setting both card value to blank
        disableDeck = false;
    }, 1200);
}

shuffleCard = () => {
    matchedCard = 0;
    cardOne =  cardTwo = ""; 
    disableDeck = false;
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8,] //creating an array of 16 item
    arr.sort(() => Math.random() > 0.5 ? 1 : -1); //sorting array items randomly

    //removing clicked class from all cards and passing random image to each card
    cards.forEach((card, index) =>{
        card.classList.remove("clicked");
        let imgTag = card.querySelector(".card .back-view img");
        imgTag.src = `./images/img-${arr[index]}.png`;
        card.addEventListener("click", flipCard)
    })
}
shuffleCard();

cards.forEach((card) => { // adding click events to all cards
    card.addEventListener("click", flipCard);
})