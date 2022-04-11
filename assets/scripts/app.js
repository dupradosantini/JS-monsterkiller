const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 12;

let chosenMaxLife = 100;
adjustHealthBars(chosenMaxLife);
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

function attackHandler(){
    const damage = dealMonsterDamage(ATTACK_VALUE);
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

attackBtn.addEventListener('click', attackHandler);