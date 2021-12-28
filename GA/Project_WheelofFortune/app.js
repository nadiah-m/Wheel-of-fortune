const main = () => {
  //<--------------------------INTERFACE-------------------------->//

  //////////////////////////// Word Library ////////////////////////////
  const wordLibrary = [
    { categories: "MOVIES", name: ["SPIDERMAN", "IRONMAN"] },
    { categories: "CELEBRITY", name: ["TOM HOLLAND", "ROBERT DOWNEY JR"] },
  ];

  ////////////////////Display category///////////////////////////////
  const $displayCategory = (wordCategory) => {
    const $category = $("#category");
    const $displayCategory = $category.text(`Category is ${wordCategory}`);
    $category.append($displayCategory);
  };

  ///////////////////Generate random word to guess/////////////////////
  const wordGenerator = () => {
    //generate random category
    const randomCategory = Math.floor(Math.random() * wordLibrary.length);
    const wordCategory = wordLibrary[randomCategory].categories;

    $displayCategory(wordCategory);

    //generate random words within category
    const wordGenerator =
      wordLibrary[randomCategory].name[
        Math.floor(Math.random() * wordLibrary.length)
      ];

    //get individual letters of words
    const charWords = wordGenerator.split("");

    //word & category generated
    return charWords;
  };

  const word = wordGenerator();
  /////////////////////////////////////////////////////////////////

  //////////////// alphabet into buttons/////////////
  const alphabet = [
    "B",
    "C",
    "D",

    "F",
    "G",
    "H",

    "J",
    "K",
    "L",
    "M",
    "N",

    "P",
    "Q",
    "R",
    "S",
    "T",

    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  //////////////////////////////////////////////////////////////

  ////////////////////create alhpabet ul//////////////////////////
  const createAlphabet = () => {
    alphabet.forEach((item) => {
      const letter = $("#alphabetbuttons").append(
        "<button>" + item + "</button>"
      );
    });
  };
  createAlphabet();
  ////////////////////create empty boxes for words/////////////////////
  const createSquares = () => {
    for (let j = 0; j < word.length; j++) {
      if (word[j] === " ") {
        //white square with text for space " "
        const $emptySpace = $("<li>").addClass("white square").attr("id", j);
        const $createSpace = $("#answerletter").append($emptySpace);
        $("#" + j).text(word[j]);
      } else {
        //green squares for letters
        const $squareLetter = $("<li>").addClass("green square").attr("id", j);
        const $createSquare = $("#answerletter").append($squareLetter);
      }
    }
  };

  createSquares();
  /////////////////////////////////////////////////////////////////////

  ///////////////////convert squares to array//////////////////////////
  const $squares = $(".square");
  const $arraySquares = $squares.toArray();
  const textArray = [];
  let letter;

  ///////////update squares with correct letter if clicked///////////
  const updateSquares = (letter) => {
    //on click of alphabet button, check if its the correct letter
    for (let i = 0; i < word.length; i++) {
      if (letter === word[i]) {
        $("#" + i).text(letter);
      }
    }
  };

  let currentPlayer = "1";

  ////////////////loop square array////////////////////////////
  const loopSquareArray = () => {
    for (let arrayIndex = 0; arrayIndex < $arraySquares.length; arrayIndex++) {
      textArray[arrayIndex] = $arraySquares[arrayIndex].innerHTML;
    }
  };
  ///////////////////////////////////////////////////////////////

  ////////////////update square with word if solved////////////////////////////
  const updateSquareSolved = (solveletter) => {
    for (let arrayIndex = 0; arrayIndex < $arraySquares.length; arrayIndex++) {
      textArray[arrayIndex] = $arraySquares[arrayIndex].innerHTML;
      $("#" + arrayIndex).text(solveletter[arrayIndex]);
    }
  };

  //<--------------------------GAME LOGIC-------------------------->//

  ///////////////check for win/////////////////////////

  const checkForWin = () => {
    loopSquareArray();
    const $result = $("#result");
    if (textArray.join("") === word.join("")) {
      if (player1.score > player2.score) {
        $result.text("Player 1 wins!");
      } else if (player2.score > player1.score) {
        $result.text("Player 2 wins!");
      } else console.log("Its a tie!");
    }
  };

  /////////change player turn///////////////
  const $playerDisplay = $(".display-player");
  console.log($playerDisplay.classList);

  const changePlayer = () => {
    $playerDisplay.removeClass(`player ${currentPlayer}`);
    currentPlayer = currentPlayer === "1" ? "2" : "1";
    $playerDisplay.text(currentPlayer);
    $playerDisplay.addClass(`player ${currentPlayer}`);
  };

  //////////check if letter already in the squares//////////
  const isValidAction = (letter, textArray) => {
    if (textArray.includes(letter)) {
      const $player1input = $("#player1Input");
      const $notallowed = $player1input.text(
        "The letter has already been chosen. Please choose another letter"
      );
      $player1input.append($notallowed);
      return false;
    }
    return true;
  };

  /////////////check for empty string in squares///////////////////
  const isGameOn = (textArray) => {
    if (textArray.includes("")) {
      console.log("The game is still on");
      return true;
    } else {
      console.log("GAME OVER");
      return false;
    }
  };

  /////////////////////////////////////////////////////////////////

  ///////////////////////////Wheel/////////////////////////////////

  const $wheel = $(".wheel");
  const $spinButton = $(".spin-btn");
  const $display = $(".display");
  let deg = 0;
  let zoneSize = 15; //deg

  const valueZones = {
    1: 5000,
    2: 0,
    3: 300,
    4: 500,
    5: 450,
    6: 500,
    7: 800,
    8: -1,
    9: 700,
    10: +1,
    11: 650,
    12: 0,
    13: 600,
    14: 500,
    15: 350,
    16: 600,
    17: 500,
    18: 400,
    19: 550,
    20: 800,
    21: 300,
    22: 700,
    23: 900,
    24: 500,
  };

  const spinWheel = () => {
    $display.text("-");
    $spinButton.css("pointer-events", "none");
    deg = Math.floor(1000 + Math.random() * 360);
    $wheel.css("transition", "all 10s ease-out");
    $wheel.css({ transform: "rotate(" + deg + "deg)" });
  };

  const handleSpinResult = (actualDeg) => {
    const zoneResult = Math.ceil(actualDeg / zoneSize);
    const wheelResult = valueZones[zoneResult];
    $display.text(wheelResult);
    const wheelItem = { wheelResult: wheelResult };
    player1.spinResult.push(wheelItem);
    console.log(player1);
  };
  0;

  const transitionEnd = () => {
    $spinButton.css("pointer-events", "auto");
    $wheel.css("transition", "none");
    const actualDeg = deg % 360;
    $wheel.css({ transform: "rotate(" + actualDeg + "deg)" });
    handleSpinResult(actualDeg);
  };

  $spinButton.on("click", spinWheel);

  $wheel.on("transitionend", transitionEnd);

  /////////////////////player data/////////////////////////////
  const player1 = {
    score: 0,
    input: [
      // {
      //   clickedletter: "nonsense",
      // },
      // {
      //   clickedletter: "nonsense",
      // },
    ],
    spinResult: [{ wheelResult: 0 }],
  };

  const player2 = {
    score: 0,
    input: [
      // {
      //   compLetter: "",
      // },
      // {
      //   compLetter: "",
      // },
      // {
      //   compLetter: "H",
      // },
    ],
    spinResult: [{ wheelResult: 0 }],
  };

  const render = (player1, textArray) => {
    player1Action(player1.input, player1.spinResult);
    console.log(player1);

    console.log(player2);
    checkForWin(textArray);
  };

  /////////////////Display player 1 input///////////////////////
  const $displayP1Letter = (inputletter) => {
    const $displayP1input = $("#player1letter");
    const $p1Letter = $displayP1input.append(
      `<li>Letter chosen by Player 1 is ${inputletter} </li>`
    );
  };
  const $displayinput = $("#player1Input");
  /////////////////////////////////////////////////////////////////////////////////

  /////////////////Display player 1 score//////////////////////
  const updateP1Score = () => {
    const $displayscorep1 = $(".display-p1score");
    $displayscorep1.removeClass("player1score");
    $displayscorep1.text(player1.score);
  };

  /////////////////Display wrong move player 1//////////////////////

  const $displayP1Wrong = () => {
    const $displayinput = $("#player1Input");
    const $displaytext = $displayinput.text(`Wrong letter. Next player turn`);
    $displayinput.append($displaytext);
  };

  //<===================PLAYER 1 ACTION===================>//
  const player1Action = (input, spinResult) => {

    //input letter into player1 data
    const lastItemInput = player1.input[input.length - 1];
    const inputletter = lastItemInput.clickedletter;

    //solve input into player1 data
    const solveinput = lastItemInput.solveinput;
    const lastItemWheel = player1.spinResult[spinResult.length - 1];

    //wheel score into player1 data
    const wheelScore = lastItemWheel.wheelResult;

    loopSquareArray();
    $displayinput.empty();

    if (isGameOn(textArray) && isValidAction(letter, textArray)) {
      /////////display letter chosen////////
      $displayP1Letter(inputletter);

      //guess correct letter
      if (word.includes(inputletter)) {
        updateSquares(inputletter);

        player1.score += wheelScore;

        /////////////display score////////////
        updateP1Score();
      } else if (
        //////////////solve input correct////////
        solveinput === word.join("")
      ) {
        const solveletter = solveinput.split("");
        $("#player1letter").empty();
        updateSquareSolved(solveletter);
        player1.score += 5;
        updateP1Score();
        $displayinput.text(`You solved it!`);

        ////////////solve input wrong//////////
      } else if (solveinput !== word.join("")) {
        $displayinput.text(`Wrong answer. Next player turn`);
        changePlayer();
        player2Action(input, spinResult);
      } else {
        /////////////////display wrong letter and change player///////////

        $displayP1Wrong();
        ////////////////////////////////////////////////////////////////////
        changePlayer();
        player2Action(input, spinResult);
      }
    }
  };

  ////////////////////display player 2 letter chosen/////////////

  const $displayP2Letter = () => {
    const $displayP2input = $("#player2letter");
    const $p2Letter = $displayP2input.append(
      `<li>Letter chosen by Player 2 is ${randomletter} </li>`
    );
  };
  ////////////////////display player 2 score/////////////
  const $displayP2Score = () => {
    const $displayscorep2 = $(".display-p2score");
    $displayscorep2.removeClass("player2score");
    $displayscorep2.text(player2.score);
  };

  //<===================PLAYER 2 ACTION===================>//
  const player2Action = (input, spinResult) => {
    const wheelNr = valueZones[Math.floor(Math.random() * 25)];

    const wheelItem = { wheelResult: wheelNr };
    player2.spinResult.push(wheelItem);
    const lastItemWheel = player2.spinResult[spinResult.length - 1];
    const wheelScore = lastItemWheel.wheelResult;

    loopSquareArray();
    randomletter = alphabet[Math.floor(Math.random() * alphabet.length)];
    const item = { compLetter: randomletter };
    player2.input.push(item);
    const lastItem = player2.input[input.length - 1];

    /////////display letter chosen////////
    $displayP2Letter();

    if (textArray.includes(randomletter)) {
      player2Action(input, spinResult);
    }
    if (word.includes(randomletter)) {
      $displayP2Letter();

      updateSquares(randomletter);
      player2.score += wheelScore;
      /////////////display score////////////
      $displayP2Score();
      player2Action(input, spinResult);
      ///////////////////////////////////////////
    } else {
      changePlayer();
    }
  };

  const handleClickedLetter = (event) => {
    const clickedletter = $(event.target).text();

    const item = { clickedletter: clickedletter };
    player1.input.push(item);
    $(event.target).attr("disabled", true);
    $(event.target).css("color", "grey");

    render(player1);
  };

  const handleSolveButton = (event) => {
    const solve = $("input").val();
    uppercaseSolve = solve.toUpperCase();
    const item = { solveinput: uppercaseSolve };
    player1.input.push(item);
    render(player1);
  };

  const handleVowel = (event) => {
    const vowel = ["A", "E", "I", "O", "U"];
    const createVowelBtn = () => {
      vowel.forEach((item) => {
        const letter = $("#vowelinput").append("<button>" + item + "</button>")
      })
    } 
    createVowelBtn();
  }

  $("#alphabetbuttons").on("click", handleClickedLetter);
  $("#solve").on("click", handleSolveButton);
  $(".vowel-btn").on("click", handleVowel);
 

  render(player1);
};

$(main);
