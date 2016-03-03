//Add created name and image based on the selected species to cell 1
function cell1(){
	$(".cell1").html(`<h2>${playerName}</h2><img src="../images/${playerSpecies}.jpg" height="150px">`);
};

function cell3(){
	var imageURL = "";
	switch (orc.species) {
		case "Orc":
			imageURL = "../images/Orc.gif";
			break;
		case "Zombie":
			imageURL = "../images/Zombie.png";
			break;
	};
	$(".cell3").html(`<h2>${orc.species}</h2><img src=${imageURL} height="150px">`);
};

//Add stats for user created player to cell 4 using the generated Hero object
function cell4(){
	$(".cell4").html(`<div id="player-stats"><ul><li>Species: ${playerSpecies}</li><li>Class: ${playerClass}</li><li id="player-health">Health: ${Hero.health}</li><li>Strength: ${Hero.strength}</li><li>Intelligence: ${Hero.intelligence}</li><li>Weapon: ${playerWeapon}</li><li>Spell: ${playerSpell}</li></ul></div>`);
};

//Add the stats for the enemy to cell 6 using the default orc
function cell6(){
	$(".cell6").html(`<div id="orc-stats"><ul><li>Species: ${orc.species}</li><li>Class: ${orc.class.name}</li><li id="enemy-health">Health: ${orc.health}</li><li>Strength: ${orc.strength}</li><li>Intelligence: ${orc.intelligence}</li><li>Weapon: ${orc.weapon}</li></ul></div>`);
};

//Function to handle fighting
function attack(playerDamage, enemyDamage){
	//Subtract provided player's damage from enemy health and save the new value; do the same for players health with the provided enemy damage
	enemyHealth = enemyHealth - playerDamage;
	playerHealth = playerHealth - enemyDamage;
	//Update player and enemy healths in the stat windows
	$("#player-health").html(`Health: ${playerHealth}`);
	$("#enemy-health").html(`Health: ${enemyHealth}`);
	//Append the results of the turn to the battle log as paragraphs for formatting
	$("#battlelog").append(`<p>${Hero.playerName} hit the enemy for ${playerDamage} damage!</p>`);
	$("#battlelog").append(`<p>The enemy hit ${Hero.playerName} for ${enemyDamage} damage!</p>`);
};

//Function to let Vampires get in a free attack each turn and have it log separately from the regular attack each turn
function sneakAttack(playerDamage){
	enemyHealth = enemyHealth - playerDamage;
	$("#enemy-health").html(`Health: ${enemyHealth}`);
	$("#battlelog").append(`<p>${Hero.playerName} hit the enemy with a sneak attack for ${playerDamage} damage!</p>`);
}