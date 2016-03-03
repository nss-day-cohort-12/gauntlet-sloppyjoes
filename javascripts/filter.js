function writeClass(string){
	$(".middle-column").append(`<div class="card__button classButton"><a class="class__link btn btn--big btn--blue" href="#"><span class="btn__prompt">></span><span class="btn__text character-class">${string}</span></a></div>`);
};

function writeWeapon(string){
	$(".weapon-column").append(`<div class="card__button weaponButton"><a class="class__link btn btn--big btn--blue" href="#"><span class="btn__prompt">></span><span class="btn__text character-weapon">${string}</span></a></div>`);
};

function writeSpell(string){
	$(".spell-column").append(`<div class="card__button spellButton"><a class="class__link btn btn--big btn--blue" href="#"><span class="btn__prompt">></span><span class="btn__text character-spell">${string}</span></a></div>`);
};