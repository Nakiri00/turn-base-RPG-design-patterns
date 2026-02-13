import { Enemy } from "../Enemy";
export class Skeleton extends Enemy {
    constructor() {
        super("Cursed Skeleton", 45, 10);
    }

    public attack(): void {
       console.log(`${this.name} memanah dari jarak jauh! (Damage: ${this.damage})`);
    }
}