var hangman = {

  guesses : 6, 

  dictionary : ["python", "flutter", "javascript", "flutter", "django"], 


  word : null,
  
  wordlen : 0,
  
  rights : 0,
 
  wrongs : 0,
  
  elImg : null,
  
  elWord : null,
  
  elChar : null,
 
  elLives : null,

  init : function () {

    hangman.elImg = document.getElementById("hangman-img");
    hangman.elWord = document.getElementById("hangman-words");
    hangman.elChar = document.getElementById("hangman-char");
    hangman.elLives = document.getElementById("hangman-lives");


    var charwrap = document.getElementById("hangman-char");
    for (var i=65; i<91; i++) {
      var charnow = document.createElement("input");
      charnow.type = "button";
      charnow.value = String.fromCharCode(i);
      charnow.disabled = true;
      charnow.addEventListener("click", hangman.check);
      charwrap.appendChild(charnow);
    }

    hangman.reset();
    document.getElementById("hangman-reset").addEventListener("click", hangman.reset);
    document.getElementById("hangman-reset").disabled = false;
  },

  toggle : function (disable) {
  

    var all = document.querySelectorAll("#hangman-char input");
    for (var i of all) {
      i.disabled = disable;
    }
  },

  reset : function () {

    hangman.rights = 0;
    hangman.wrongs = 0;
    hangman.elLives.innerHTML = hangman.guesses;
    hangman.elImg.style.opacity = 0;

    hangman.word = hangman.dictionary[Math.floor(Math.random() * Math.floor(hangman.dictionary.length))];
    hangman.word = hangman.word.toUpperCase();
    hangman.wordlen = hangman.word.length;

    hangman.elWord.innerHTML = "";
    for (var i=0; i<hangman.word.length; i++) {
      var charnow = document.createElement("span");
      charnow.innerHTML = "_";
      charnow.id = "hangword-" + i;
      hangman.elWord.appendChild(charnow);
    }

   
    hangman.toggle(false);
  },

  check : function () {

    var index = 0, hits = [];
    while (index >= 0) {
      index = hangman.word.indexOf(this.value, index);
      if (index == -1) { break; }
      else { 
        hits.push(index);
        index++;
      }
    }

    
    if (hits.length > 0) {
      // Reveal words
      for (var hit of hits) {
        document.getElementById("hangword-" + hit).innerHTML = this.value;
      }

      
      hangman.rights += hits.length;
      if (hangman.rights == hangman.wordlen) {
        hangman.toggle(true);
        alert("Kazandın");
      }
    } else {
      
      hangman.wrongs++;
      var livesleft = hangman.guesses - hangman.wrongs;
      hangman.elLives.innerHTML = livesleft;
      hangman.elImg.style.opacity = (1 - (livesleft/hangman.guesses)).toFixed(2);

      
      if (hangman.wrongs == hangman.guesses) {
        hangman.toggle(true);
        alert("Kaybettin");
      }
    }

   
    this.disabled = true;
  }
};

window.addEventListener("load", hangman.init);