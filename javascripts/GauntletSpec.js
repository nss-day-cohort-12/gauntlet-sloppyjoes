describe("Gauntlet", function() {


it("should have a name function", function(){
	expect(name).toBeDefined();
});

it("should have a function to write classes to the DOM", function(){
	expect(writeClass).toBeDefined();
});

it("should have a function to write weapons to the DOM", function(){
	expect(writeWeapon).toBeDefined();
});

it("should have a function to write spells to the DOM", function(){
	expect(writeSpell).toBeDefined();
});

it("should have a function to populate cell 1 with user information and hero picture", function(){
	expect(cell1).toBeDefined();
});

it("should have a function to populate cell 3 with enemy information and picture", function(){
	expect(cell3).toBeDefined();
});

it("should have a function to populate cell 4 with player stats based on generated Hero", function(){
	expect(cell4).toBeDefined();
});

it("should have a function to populate cell 6 with enemy stats", function(){
	expect(cell6).toBeDefined();
});

it("should have a function to handle combat", function(){
	expect(attack).toBeDefined();
});

it("should have a function to handle extra attacks by vampires", function(){
	expect(sneakAttack).toBeDefined();
});

it("should have a function to generate a random enemy", function(){
	expect(generateEnemy).toBeDefined();
});

});