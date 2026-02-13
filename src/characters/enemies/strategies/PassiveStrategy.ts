import type { IEnemyStrategy } from "../interfaces/IEnemyStrategy";
import { Enemy } from "../Enemy";

export class PassiveStrategy implements IEnemyStrategy {
    public execute(enemy: Enemy): void {
        console.log(`${enemy.name} (Passive): Hmm... sepi ya hari ini!`);
        enemy.attack(); // Memanggil method attack milik musuh
    }
}