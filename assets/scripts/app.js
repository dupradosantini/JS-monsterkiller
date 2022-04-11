const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 12;
const STRONG_ATTACK_VALUE = 17;
const HEAL_VALUE = 20;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;
adjustHealthBars(chosenMaxLife);

function endRound(){
    const initialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth = currentPlayerHealth - playerDamage;

    if(currentPlayerHealth<= 0 && hasBonusLife){
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        alert('You would be dead, but the bonus life saved you');
        setPlayerHealth(initialPlayerHealth);
    }

    if(currentMonsterHealth <= 0 && currentPlayerHealth > 0){
        alert("You Won!!");
    }else if(currentPlayerHealth <= 0 && currentMonsterHealth > 0){
        alert("You Lost");
    } else if(currentPlayerHealth <= 0 && currentMonsterHealth <= 0){
        alert("You have a draw!")
    }
    if(currentMonsterHealth <= 0 || currentPlayerHealth <= 0){
        reset();
    }
}

function attackMonster(mode){
    let maxDamage;
    if(mode === "ATTACK"){
        maxDamage = ATTACK_VALUE;
    } else {
        maxDamage = STRONG_ATTACK_VALUE;
    }

    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth = currentMonsterHealth - damage;

    endRound();
}

function attackHandler(){
    attackMonster("ATTACK");
}

function strongAttackHandler(){
    attackMonster("STRONG_ATTACK")
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
    endRound();
}

function reset(){
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);