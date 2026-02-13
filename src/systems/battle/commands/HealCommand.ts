import type { ICommand } from "../interfaces/ICommand";
import { GameUnit } from "../GameUnit";

export class HealCommand implements ICommand {
    constructor(
        private unit: GameUnit, 
        private amount: number
    ) {}

    public execute(): void {
        this.unit.heal(this.amount);
    }

    public undo(): void {
        console.log(`[UNDO] Membatalkan healing ${this.unit.name}...`);
        // Kebalikan dari Heal adalah Damage (Take Damage)
        this.unit.takeDamage(this.amount);
    }
}