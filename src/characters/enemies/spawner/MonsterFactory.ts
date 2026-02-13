import { Enemy } from "../Enemy";

export abstract class MonsterFactory {
    // Subclass yang akan menentukan monster apa yang dibuat
    public abstract createEnemy(): Enemy;

    public spawnMonster(): Enemy {
        const enemy = this.createEnemy();
        console.log(`\n--- SPAWNING EVENT ---`);
        console.log(`Sebuah bayangan muncul... ${enemy.name} telah hadir!`);
        return enemy;
    }
}