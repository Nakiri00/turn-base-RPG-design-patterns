import type { IEnemyStrategy } from "../interfaces/IEnemyStrategy";
import { Enemy } from "../Enemy";

export class DefensiveStrategy implements IEnemyStrategy {
    public execute(enemy: Enemy): void {
        console.log(`${enemy.name} (Defensive): Waduh, bahaya! Mundur dulu!`);
        enemy.attack(); 
    }
}