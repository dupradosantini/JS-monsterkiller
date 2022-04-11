const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 12;
const STRONG_ATTACK_VALUE = 17;

let chosenMaxLife = 100;
adjustHealthBars(chosenMaxLife);
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

function attackMonster(mode){
    let maxDamage;
    if(mode === "ATTACK"){
        maxDamage = ATTACK_VALUE;
    } else {
        maxDamage = STRONG_ATTACK_VALUE;
    }

    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth = currentMonsterHealth - damage;

    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth = currentPlayerHealth - playerDamage;

    if(currentMonsterHealth <= 0 && currentPlayerHealth > 0){
        alert("You Won!!");
    }else if(currentPlayerHealth <= 0 && currentMonsterHealth > 0){
        alert("You Lost");
    } else if(currentPlayerHealth <= 0 && currentMonsterHealth <= 0){
        alert("You have a draw!")
    }
}

function attackHandler(){
    attackMonster("ATTACK");
}

function strongAttackHandler(){
    attackMonster("STRONG_ATTACK")
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);