
type DigiSoldier = {
    str:number,
    agi: number,
    sur: number,
    hp: number
}

export const attack = (attacker: DigiSoldier, defender: DigiSoldier) => {  
    let damage = attacker.str - defender.agi;  
    damage = damage > 0 ? damage : 1; // Minimum damage is 1  
    defender.hp -= damage; 
}

export const specialAbility = (attacker: DigiSoldier, defender: DigiSoldier)=> {  
    // Implement special ability effect
    let damage = (attacker.str * 2) - defender.agi;  
    damage = damage > 0 ? damage : 1;  
    defender.hp -= damage;  
}  
