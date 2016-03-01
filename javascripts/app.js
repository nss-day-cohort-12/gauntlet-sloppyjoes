  var playerName = "";
  var playerSpecies = "";
  var playerClass = "";
/*
  Test code to generate a human player and an orc player
 */
var warrior = new Gauntlet.Combatants.Human();
warrior.setWeapon(new WarAxe());
warrior.generateClass();  // This will be used for "Surprise me" option
console.log(warrior.toString());

var orc = new Gauntlet.Combatants.Orc();
orc.generateClass();
orc.setWeapon(new BroadSword());
console.log(orc.toString());

/*
  Test code to generate a spell
 */
var spell = new Gauntlet.SpellBook.Sphere();
console.log("spell: ", spell.toString());


$(document).ready(function() {
  /*
    Show the initial view that accepts player name
   */
  $("#player-setup").show();


  /*
    When any button with card__link class is clicked,
    move on to the next view.
   */
  $(".card__link").click(function(e) {
    var nextCard = $(this).attr("next");
    var moveAlong = false;
    playerName = $("#player-name").val();

    switch (nextCard) {
      case "card--class":
        moveAlong = (playerName !== "" && playerSpecies !== "");
        break;
      case "card--weapon":
        moveAlong = (playerClass !== "");
        break;
    }

    if (moveAlong) {
      $(".card").hide();
      $("." + nextCard).show();
    }
  });

  /*
    When the back button clicked, move back a view
   */
  $(".card__back").click(function(e) {
    var previousCard = $(this).attr("previous");
    $(".card").hide();
    $("." + previousCard).show();
  });

    //Target all of the species buttons
  $(".speciesButton").click(function(e){
      //When clicked look at the first child of the button with the tag name "a"
      //target the first child of the "a" element and log it's inner HTML
    console.log($(e.currentTarget).children("a").children(".species").html());
      //Set playerSpecies to the value of the species span's HTML
    playerSpecies = $(e.currentTarget).children("a").children(".species").html();
    return playerSpecies;
  });

  $(".classButton").click(function(e){
    console.log($(e.currentTarget).children("a").children(".character-class").html());
    playerClass = $(e.currentTarget).children("a").children(".character-class").html();
    return playerClass;
  });


});