export const generateLootBox = (level:number)=>{
    const coins = Math.floor(Math.random() * 100) + level * 100;
    const power = Math.floor(Math.random() * 10) + level * 5;
    const gpus = Math.floor(Math.random() * 5 + level / 2);
    return {"coins": coins,"power": power,"gpus": gpus};
}