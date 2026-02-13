import type { IEnemyStrategy } from "./interfaces/IEnemyStrategy";
// Default strategy, misal Passive
import { PassiveStrategy } from "./strategies/PassiveStrategy"; 

export abstract class Enemy {
    private strategy: IEnemyStrategy;

    constructor(public name: string, public hp: number, public damage: number) {
        this.strategy = new PassiveStrategy(); // Default behavior
    }

    public setStrategy(strategy: IEnemyStrategy): void {
        this.strategy = strategy;
        console.log(`[AI CHANGE] ${this.name} ganti strategi ke ${strategy.constructor.name}`);
    }

    public performAction(): void {
        this.strategy.execute(this);
    }

    // Method ini akan dipanggil oleh Strategy atau sistem battle
    public attack(): void {
        console.log(`${this.name} menyerang dengan damage ${this.damage}!`);
    }
}