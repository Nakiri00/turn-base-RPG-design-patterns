import { Subject } from "../core/events/Subject"; // Import dari langkah sebelumnya
import type { IHeroState } from "./hero/interfaces/IHeroState";
import { NormalState } from "./hero/states/NormalState";

export class Hero extends Subject {
    public state: IHeroState;
    public hp: number;
    public maxHp: number;

    constructor(public name: string, hp: number) {
        super(); 
        this.name = name;
        this.hp = hp;
        this.maxHp = hp;
        this.state = new NormalState(); 
    }

    public setState(newState: IHeroState): void {
        this.state = newState;
        console.log(`[STATUS CHANGE] ${this.name} sekarang: ${newState.constructor.name}`);
        this.notify(); 
    }
    
    public attack(): void {
        this.state.attack(this);
    }

    public takeDamage(amount: number): void {
        this.state.takeDamage(this, amount);
        if (this.hp < 0) this.hp = 0;
        this.notify(); 
    }

    public heal(amount: number): void {
        this.hp += amount;
        if (this.hp > this.maxHp) this.hp = this.maxHp;
        console.log(`${this.name} healing ${amount} HP.`);
        this.notify();
    }
}