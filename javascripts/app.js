  var playerName = "";
  var playerSpecies = "";
  var playerClass = "";
  var Hero;
  var playerWeapon= "";
  var playerSpell = "";
  var playerHealth;
  var enemyHealth;
  var playerDamage = "";
  var enemyDamage = "";
  var enemies = ["Orc", "Zombie", "Werewolf"];

  var swordHit = new Audio();
  swordHit.src = "../audio/sword_hit.mp3";

  //Placeholder to the spell that's generated every turn
  var newSpell;
/*
  Test code to generate a human player and an orc player
 */
var warrior = new Gauntlet.Combatants.Human();
warrior.setWeapon(new WarAxe());
warrior.generateClass();  // This will be used for "Surprise me" option
console.log(warrior.toString());


var orc = {};
function generateEnemy(){
  var random = Math.round(Math.random() * (enemies.length - 1));
  var randomSpeciesString  = enemies[random];
  orc = new Gauntlet.Combatants[randomSpeciesString];
  orc.generateClass();
  orc.setWeapon(new BroadSword());
  console.log(orc.toString());
}

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
        Hero = new Gauntlet.Combatants[playerSpecies];
        Hero.playerName = playerName;
        $(".middle-column").html("");
        Hero.allowedClasses.forEach(function(currentString){
          writeClass(currentString);  
        });
        
        $(".classButton").click(function(e){
          console.log($(e.currentTarget).children("a").children(".character-class").html());
          playerClass = $(e.currentTarget).children("a").children(".character-class").html();
          return playerClass;
        });
        break;
      case "card--weapon":
        moveAlong = (playerClass !== "");
        Hero.setClass(playerClass);
        
        //Reset the weapon and spell columns when the button is clicked
        $(".weapon-column").html("");
        $(".spell-column").html("");

        //One by one add the weapons the Hero is strong enough to use
        if (Hero.strength > 55) {
          writeWeapon("Dagger");
        };
        if (Hero.strength > 115) {
          writeWeapon("Broad Sword");
        };
        if (Hero.strength > 135) {
          writeWeapon("War Axe");
        };

        //If hero can't have spells do nothing, else add spells hero is intelligent enough to use one by one
        switch (Hero.magical) {
          case false:
            break;
          case true:
            if (Hero.intelligence > 115) {
              writeSpell("Sphere");
            };
            if (Hero.intelligence > 185) {
              writeSpell("Blast");
            };
            if (Hero.intelligence > 195) {
              writeSpell("Shocker");
            };
            break;
        };
        //add listeners to weapon and spell buttons after they're written
        $(".weaponButton").click(function(e){
          console.log($(e.currentTarget).children("a").children(".character-weapon").html());
          playerWeapon = $(e.currentTarget).children("a").children(".character-weapon").html();
          return playerWeapon;
        }); 

        $(".spellButton").click(function(e){
          console.log($(e.currentTarget).children("a").children(".character-spell").html());
          playerSpell = $(e.currentTarget).children("a").children(".character-spell").html();
          return playerSpell;
        });
        break;
      case "card--battleground" :
        //Make sure available weapons/spells have been selected before moving on to battle
        if (Hero.magical === false) {
          moveAlong = (playerWeapon !== "");
        } else if (Hero.magical === true && Hero.strength < 55) {
          moveAlong = (playerSpell !== "");
        } else if (Hero.magical === true && Hero.strength > 55) {
          moveAlong = (playerWeapon !== "" && playerSpell !== "");
        };
        //If a weapon is chosen, call setWeapon to give it to the hero 
        switch (playerWeapon) {
          case "Dagger":
            Hero.setWeapon(new Dagger());
            break;
          case "War Axe":
            Hero.setWeapon(new WarAxe());
            break;
          case "Broad Sword":
            Hero.setWeapon(new BroadSword());
            break;  
        };
        //Go ahead and set values for player and enemy health to be used in battle
        generateEnemy();
        playerHealth = Hero.health;
        enemyHealth = orc.health;
        //populate cells 1, 4, and 6 using their functions
        cell1();
        cell3();
        cell4();
        cell6();
        // $(".continue-button").addClass("disabled");
    }

    if (moveAlong) {
      $(".card").hide();
      $("." + nextCard).show();
    }
  });

  $(".continue-button").click(function(){
    generateEnemy();
    playerHealth = Hero.health;
    enemyHealth = orc.health;
    $(".fight-a").removeClass("disabled");
    $("#outcome-output").html("");
    $("#battlelog").html("");
    cell1();
    cell3();
    cell4();
    cell6();
    $("#player-health").removeClass("red-health");
    $("#enemy-health").removeClass("red-health");
  })

  /*
    When the back button clicked, move back a view
   */
  $(".card__back").click(function(e) {
    Hero = {};
    // var previousCard = $(this).attr("previous");
    $(".card").hide();
    $(".card--name").show();
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

  $(".restart-button").click(function(e) {
    //Reset Hero object, hide fight page, show name/species screen
    //Remove disabled class from fight button, reset fight result and battlelog
    Hero = {};
    $(".card").hide();
    $(".card--name").show();
    $("#player-name").val("");
    $(".fight-a").removeClass("disabled");
    $("#outcome-output").html("");
    $("#battlelog").html("");
    $("#player-health").removeClass("red-health");
    $("#enemy-health").removeClass("red-health");
  });


  $(".fight-button").click(function(e){
    //If fight button has the disabled class do nothing
    if ($(".fight-a").hasClass("disabled")){
      return;
    }else {
      //Set player damage to 0 every turn, then reset it based on present weapons and spells
      playerDamage = 0;
      if (playerWeapon !== "") {
        playerDamage += Hero.weapon.damage;
      };
      if (playerSpell !== "") {
        switch (playerSpell){
          case "Sphere":
            newSpell = new Gauntlet.SpellBook.Sphere();
            playerDamage += newSpell.damage;
            break;
          case "Blast":
            newSpell = new Gauntlet.SpellBook.Blast();
            playerDamage += newSpell.damage;
            break;
          case "Shocker":
            newSpell = new Gauntlet.SpellBook.Shocker();
            playerDamage += newSpell.damage;
            break;
        };
      };
      //If hero is a Vampire call sneak attack at the beginning of the round to get a free hit in
      if (Hero.species === "Vampire"){
        sneakAttack(playerDamage);
      };
      //Set enemy's damage to the damage of orc's weapon
      enemyDamage = orc.weapon.damage;
      //Send player and enemy damage to attack function
      attack(playerDamage, enemyDamage);

      $("#player-health").addClass("red-health");
      $("#enemy-health").addClass("red-health");
      
    }
  });









});