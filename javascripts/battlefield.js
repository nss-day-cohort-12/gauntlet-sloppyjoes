function cell1(){
	$(".cell1").html(`<h2>${playerName}</h2><img src="../images/${playerSpecies}.jpg" height="150px">`);
};

function cell4(){
	$(".cell4").html(`<div id="player-stats"><ul><li>Species: ${playerSpecies}</li><li>Class: ${playerClass}</li><li>Health: ${Hero.health}</li><li>Strength: ${Hero.strength}</li><li>Intelligence: ${Hero.intelligence}</li><li>Weapon: ${playerWeapon}</li><li>Spell: ${playerSpell}</li></ul></div>`);
};

function cell6(){
	$(".cell6").html(`<div id="orc-stats"><ul><li>Species: ${orc.species}</li><li>Class: ${orc.class.name}</li><li>Health: ${orc.health}</li><li>Strength: ${orc.strength}</li><li>Intelligence: ${orc.intelligence}</li><li>Weapon: ${orc.weapon}</li></ul></div>`);
};