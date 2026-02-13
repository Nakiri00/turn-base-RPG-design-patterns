import type { IEnemyStrategy } from "../interfaces/IEnemyStrategy";
import { Enemy } from "../Enemy";

export class DefensiveStrategy implements IEnemyStrategy {
    public execute(enemy: Enemy): void {
        console.log(`${enemy.name} (Defensif): "Waduh, bahaya! Mundur dulu!"`);
        console.log("-> Mundur menjauh dari player...");
        
        enemy.hp += 10;
        console.log(`-> Menggunakan Potion. HP sekarang: ${enemy.hp}`);
    }
}