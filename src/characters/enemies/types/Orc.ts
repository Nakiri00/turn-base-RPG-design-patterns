import { Enemy } from "../Enemy";

export class Orc extends Enemy {
    constructor() {
        super("Orc Warrior", 80, 15);
    }

    public attack(): void {
        console.log(`${this.name} menghantam dengan gada besar! (Damage: ${this.damage})`);
    }
}