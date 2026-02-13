import { Enemy } from "../Enemy";

export class Goblin extends Enemy {
    constructor() {
        super("Goblin Scout", 30, 5);
    }
    
    public attack(): void {
        console.log(`${this.name} menusuk licik dengan belati! (Damage: ${this.damage})`);
    }
}