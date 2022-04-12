const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 12;
const STRONG_ATTACK_VALUE = 17;
const HEAL_VALUE = 20;

const MODE_ATTACK = "ATTACK"; //Mode 0 for normal attack
const MODE_STRONG_ATTACK = "STRONG_ATTACK"; //Mode 1 for strong attack
const LOG_EVENT_PLAYER_ATTACK = "PLAYER_ATTACK";
const LOG_EVENT_PLAYER_STRONG_ATTACK = "PLAYER_STRONG_ATTACK";
const LOG_EVENT_MONSTER_ATTACK = "MONSTER_ATTACK";
const LOG_EVENT_PLAYER_HEAL = "PLAYER_HEAL";
const LOG_EVENT_GAME_OVER = "GAME_OVER;"

const enteredValue = prompt("Maximum life for you and the monster", "100");
let chosenMaxLife = parseInt(enteredValue);
let battleLog = [];
if(isNaN(chosenMaxLife) || chosenMaxLife <= 0){
    chosenMaxLife=100;
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;
adjustHealthBars(chosenMaxLife);

function writeToLog(event, amount, monsterHealth, playerHealth){
    let logEntry={
        event: event,
        value: amount,
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth
    };
    switch(event){
        case LOG_EVENT_PLAYER_ATTACK: // this check is triple equals "==="
            logEntry.target = "MONSTER";
            break;
        case LOG_EVENT_PLAYER_STRONG_ATTACK:
            logEntry.target = "MONSTER";
            break;
        case LOG_EVENT_MONSTER_ATTACK:
            logEntry.target = "PLAYER";
            break;
        case LOG_EVENT_PLAYER_HEAL:
            logEntry.target = "PLAYER";
            break;
        default:
            logEntry = {};
            break;
    }
    battleLog.push(logEntry);
}

function endRound(){
    const initialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth = currentPlayerHealth - playerDamage;
    writeToLog(LOG_EVENT_MONSTER_ATTACK, playerDamage, currentMonsterHealth, currentPlayerHealth);

    if(currentPlayerHealth<= 0 && hasBonusLife){
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        alert('You would be dead, but the bonus life saved you');
        setPlayerHealth(initialPlayerHealth);
    }

    if(currentMonsterHealth <= 0 && currentPlayerHealth > 0){
        alert("You Won!!");
        writeToLog(LOG_EVENT_GAME_OVER, "PLAYER WON", currentMonsterHealth, currentPlayerHealth);
    }else if(currentPlayerHealth <= 0 && currentMonsterHealth > 0){
        alert("You Lost");
        writeToLog(LOG_EVENT_GAME_OVER, "MONSTER WON", currentMonsterHealth, currentPlayerHealth);
    } else if(currentPlayerHealth <= 0 && currentMonsterHealth <= 0){
        alert("You have a draw!")
        writeToLog(LOG_EVENT_GAME_OVER, "A DRAW", currentMonsterHealth, currentPlayerHealth);

    }
    if(currentMonsterHealth <= 0 || currentPlayerHealth <= 0){
        reset();
    }
}

function attackMonster(mode){
    const maxDamage = (mode === MODE_ATTACK) ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
    const logEvent = (mode === MODE_ATTACK) ? LOG_EVENT_PLAYER_ATTACK : LOG_EVENT_PLAYER_STRONG_ATTACK;

    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth = currentMonsterHealth - damage;
    writeToLog(logEvent, damage, currentMonsterHealth, currentPlayerHealth);

    endRound();
}

function attackHandler(){
    attackMonster(MODE_ATTACK);
}

function strongAttackHandler(){
    attackMonster(MODE_STRONG_ATTACK)
}

function healPlayerHandler(){
    let healValue;
    if(currentPlayerHealth >= chosenMaxLife - HEAL_VALUE){
        alert("You can't heal to more than your max health.");
        healValue = chosenMaxLife - currentPlayerHealth;
    } else {
        healValue = HEAL_VALUE;
    }
    increasePlayerHealth(healValue);
    currentPlayerHealth += healValue;
    writeToLog(LOG_EVENT_PLAYER_HEAL, healValue, currentMonsterHealth, currentPlayerHealth);
    endRound();
}

function reset(){
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}

function printLogHandler(){
    console.log(battleLog);
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', printLogHandler);