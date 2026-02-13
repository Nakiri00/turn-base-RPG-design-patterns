import type { IEnemyStrategy } from "../interfaces/IEnemyStrategy";
import { Enemy } from "../Enemy";

export class AggressiveStrategy implements IEnemyStrategy {
    public execute(enemy: Enemy): void {
        console.log(`${enemy.name} (Aggressive): SERANG MEMBABI BUTA!`);
        enemy.attack(); // Memanggil method attack milik musuh
    }
}