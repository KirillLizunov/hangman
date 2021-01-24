import {ruswords} from "./words.js";
let okButton=document.querySelector("#okButton");
//let words=["доска","круг","гидроэлектростанция","сверхдержавный","полотенце"];
let words=ruswords;
let userInput=document.querySelector("#userInput");
let secretWord=words[Math.floor(Math.random()*words.length)];
let cypher=document.querySelector("h2");
let imageNumber=0;
let usedLetters="";
let podskazka=document.querySelector("h3");
let img=document.getElementById("hangman");
let h1=document.querySelector("h1");
console.log(h1);
let newButton=document.querySelector("#newButton");
let modeButton=document.getElementById("modeButton");
let modal=document.getElementsByClassName("modal")[0];
let multiplayer=document.getElementById("multiplayer");
let single=true;
let wordModal=document.getElementsByClassName("wordModal")[0];
let wordButton=document.getElementById("wordButton");
let wordInput=document.getElementById("wordInput");
let wordLength=document.querySelector("h5");
NewGame();
function NewGame() {
    cypher.innerHTML="*".repeat(secretWord.length);
    okButton.disabled=false;
    usedLetters="";
    podskazka.innerHTML="Введи букву и проверь";
    img.src="hangman0.png";
    imageNumber=0;
    wordLength.innerHTML="Длина слова: " + secretWord.length;
    if (single) {
        h1.innerHTML="Виселица";
    }
    else {
        h1.innerHTML="Виселица. Мультиплеер";
    }
}
okButton.onclick=function(event) {
    event.preventDefault();
    let letter=userInput.value;
    userInput.select();
//    console.log(userInput.value); 
    if (!usedLetters.includes(letter)){
        usedLetters=usedLetters+" "+letter;
        podskazka.innerHTML="Использованные буквы: "+usedLetters;
    }
    if (secretWord.includes(letter)){
        let newWord="";
        for (let i=0; i<secretWord.length; i++) {
         if (letter==secretWord[i]) {
             newWord=newWord+letter; 
         } else {
             newWord=newWord+cypher.innerHTML[i];
             
         }
        }
//        console.log(newWord)
        cypher.innerHTML=newWord;
        if (cypher.innerHTML==secretWord) {
            h1.innerHTML="Угадал, можешь попить чай";
            okButton.disabled=true;
        }
    }
    else {
        console.log("Не угадали");
        imageNumber=imageNumber+1;
        img.src="hangman"+imageNumber+".png";
        if (imageNumber==6) {
            h1.innerHTML="Вы погибли в неравном бою!";
            okButton.disabled=true;
            podskazka.innerHTML="Эх ты, а слово то было " + secretWord;
        }
    }
}
newButton.onclick=function(event) {
    console.log("Работает");
    event.preventDefault();
    secretWord=words[Math.floor(Math.random()*words.length)];
    console.log(secretWord);
    NewGame();
    if (single) {
        secretWord=words[Math.floor(Math.random()*words.length)];
        NewGame();
    }
    else {
        wordModal.style.display="block";
        wordInput.value="";
        wordInput.select();
    }
}
modeButton.onclick=function(event) {
    // что бы не обновлялась страница
    event.preventDefault();
    modal.style.display="block";
}
modal.onclick=function() {
    modal.style.display="none";
}
// Чтобы modal не закрывался, когда мы нажимаем на форму
modal.children[0].onclick=function(event) {
    event.stopPropagation();
}
wordModal.onclick=function() {
    wordModal.style.display="none";
}
wordModal.children[0].onclick=function(event) {
    event.stopPropagation();
}
multiplayer.onclick=function(event) {
    event.preventDefault();
    modal.style.display="none";
    h1.innerHTML="Виселица. Мультиплеер";
    single=false;
    wordModal.style.display="block";
    wordInput.select();
}
wordButton.onclick=function(event) {
    event.preventDefault();
    
    secretWord=wordInput.value;
    if (secretWord.length>=3) {
        NewGame();
        wordModal.style.display="none";
    }
}




