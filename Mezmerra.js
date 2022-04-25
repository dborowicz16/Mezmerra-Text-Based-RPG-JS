#!usr/bin/env node

// Constructs the readline module
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

let nameInput = "";
let classInput = "";
let characterStrength;
let characterHealth;
let characterStealth;
let character = { nameInput, classInput, characterHealth, characterStrength, characterStealth };
let bear = { name: "bear", health: 75, strength: 20, stealth: 25 };
let wolf = { name: "wolf", health: 50, strength: 15, stealth: 50 };
let shark = { name: "shark", health: 75, strength: 20, stealth: 25 };
let perrywinkle = { name: "Perrywinkle", health: 100, strength: 75, stealth: 75 };
let monsterDeathCount = 0;
const randomMonster = [bear, wolf, shark, perrywinkle];
let monster = randomMonster[Math.floor(Math.random() * 4)];


characterNameSelection(nameInput);


    //Asks the user for name input
function characterNameSelection() {
    readline.question("Welcome to Mezzmera! What is your character's name?", (nameInput) => { repeatCharacterName(nameInput) });
}
    //Confirms name and then runs class selection
function repeatCharacterName(nameInput) {
    console.log(`Okay! So your name is ${nameInput}? That's a cool name!`);
    character.nameInput = nameInput;
    classSelection();
}
    //Asks for class, assigns it to character object, then runs function to confirm character class
function classSelection(classInput) {
    readline.question("What type of fighter are you? Are you a paladin, berzerker, or thief?", (classInput) => { repeatCharacterClass(classInput) })
    character.classInput = classInput;
}
    //Runs function to confirm class & name
function repeatCharacterClass(classInput) {
    console.log(`Okay! So you are a ${classInput}? Quite the profession!`);
    character.classInput = classInput;
    characterConfirmation();
}

    //Asks user to confirm class and name. If confirmed, character is given stats based on class selection
    //If yes, battle starts. If no, function is repeated
function characterConfirmation(nameInput, classInput) {
    console.log(`So your name is ${character.nameInput} and you are a ${character.classInput}?`)
    readline.question("Are you sure you want to stick with this class & name? Type 'yes' or 'no'", (confirmation) => {
        if (confirmation == "yes") {
            if (character.classInput == "thief") {
                character.characterHealth = 25;
                character.characterStrength = 10;
                character.characterStealth = 75;
            }
            else if (character.classInput == "paladin") {
                character.characterHealth = 100;
                character.characterStrength = 50;
                character.characterStealth = 25;
            }
            else if (character.classInput == "berzerker") {
                character.characterHealth = 75;
                character.characterStrength = 75;
                character.characterStealth = 10;
            }
            // Start battle
            startBattle();

        }
        else if (confirmation == "no") {
            characterNameSelection(nameInput);
        }
        else {
            console.log("You must input either 'yes' or 'no'!");
            characterConfirmation(nameInput, classInput);
        }
    })
}
    //If monster is the same as last fight then randomly assign a new one, announce the monster, and give user decision to attack or heal
function startBattle() {
    if (monster == monster) {
        monster = randomMonster[Math.floor(Math.random() * 4)]
    }

    console.log(`Uh oh! A wild ${monster.name} has appeared!`)

    characterAttackOrHeal();
    // Ask user if they want to attack or heal. Adjust HP accordingly, then have monster attack. Check for if monster or character dies

}

    //If attack, calculate chance that character hits (25 stealth = 25% chance of dodging attack)
    //If monster gets hit then run check if monster dies function
    //If monster dodges then run monster attack function
function characterAttackOrHeal() {
    readline.question("Do you want to attack or heal?", (choice) => {
        if (choice == "attack") { // calculate if opponent gets hit, calculate the damage, change HP, send message
            if (monster.stealth == 25) {
                if (Math.floor(Math.random() * 4) == 1) {
                    console.log(`The ${monster.name} was too quick and dodged your attack!`)
                    monsterAttack();
                }
                else if (Math.floor(Math.random() * 4) != 1) {
                    //calculate damage
                    monster.health = monster.health - character.characterStrength
                    console.log(`The ${monster.name} took ${character.characterStrength} damage and has ${monster.health} HP left!`)
                    checkIfMonsterDies();
                }
            }

            else if (monster.stealth == 50) {
                if (Math.floor(Math.random() * 4) == 1 || Math.floor(Math.random() * 4) == 2) {
                    console.log(`The ${monster.name} was too quick and dodged your attack!`)
                    monsterAttack();
                }
                else if (Math.floor(Math.random() * 4) != 1 && Math.floor(Math.random() * 4) != 2) {
                    //calculate damage
                    monster.health = monster.health - character.characterStrength
                    console.log(`The ${monster.name} took ${character.characterStrength} damage and has ${monster.health} HP left!`)
                    checkIfMonsterDies();
                }
            }

            else if (monster.stealth == 75) {
                if (Math.floor(Math.random() * 4) == 1 || Math.floor(Math.random() * 4) == 2 || Math.floor(Math.random() * 4) == 3) {
                    console.log(`The ${monster.name} was too quick and dodged your attack!`)
                    monsterAttack();
                }
                else if (Math.floor(Math.random() * 4) != 1 && Math.floor(Math.random() * 4) != 2 && Math.floor(Math.random() * 4) != 3) {
                    //calculate damage
                    monster.health = monster.health - character.characterStrength
                    console.log(`The ${monster.name} took ${character.characterStrength} damage and has ${monster.health} HP left!`)
                    checkIfMonsterDies();
                }
            }
        }   //If heal is chosen then update characters HP and then run monster attack function
        else if (choice == "heal") {
            if (character.classInput == "thief") {
                healthGained = Math.floor(Math.random() * 11);
                character.characterHealth = character.characterHealth + healthGained;
                console.log(`${character.nameInput} tended to his wounds and gained ${healthGained} HP. ${character.nameInput} now has ${character.characterHealth} HP!`);
            }
            else if (character.classInput == "paladin") {
                healthGained = Math.floor(Math.random() * 26);
                character.characterHealth = character.characterHealth + healthGained;
                console.log(`${character.nameInput} tended to his wounds and gained ${healthGained} HP. ${character.nameInput} now has ${character.characterHealth} HP!`);
            }
            else if (character.classInput == "berzerker") {
                healthGained = Math.floor(Math.random() * 21);
                character.characterHealth = character.characterHealth + healthGained;
                console.log(`${character.nameInput} tended to his wounds and gained ${healthGained} HP. ${character.nameInput} now has ${character.characterHealth} HP!`);
            }
            monsterAttack();
        }

    }
    )
}
    //Update character HP and check to see if the character dies
function monsterAttack() {
    character.characterHealth = character.characterHealth - monster.strength;
    console.log(`${character.nameInput} took ${monster.strength} damage and now has ${character.characterHealth} HP left!`);
    checkIfCharacterDies();
}
    //Check to see if characters HP is 0 or less. If it is then the game is over. If HP is above 0 then characterAttackOrHeal function runs
function checkIfCharacterDies() {
    if (character.characterHealth <= 0) {
        console.log(`${character.nameInput} fought valiantly, however the mighty ${monster.name} proved to be too much and ${character.nameInput} succame to their injuries`);
        console.log(`${character.nameInput} was able to slay ${monsterDeathCount} monsters before they were defeated!`);
    }
    else if (character.characterHealth > 0) {
        characterAttackOrHeal();
    }
}
    //Checks if monster dies. If it does a new monster comes. If HP is above zero than the monster attacks again
function checkIfMonsterDies() {
    if (monster.health <= 0) {
        console.log(`${character.nameInput} slayed the ${monster.name}!`);
        monsterDeathCount = monsterDeathCount + 1;
        startBattle();
    }
    else if (monster.health > 0) {
        monsterAttack();
    }    
}



