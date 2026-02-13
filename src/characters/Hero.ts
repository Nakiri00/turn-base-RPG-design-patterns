import { Subject } from "../core/events/Subject"; // Import dari langkah sebelumnya
import type { IHeroState } from "./hero/interfaces/IHeroState";
import { NormalState } from "./hero/states/NormalState";

export class Hero extends Subject {
    public state: IHeroState;
    public hp: number;
    public maxHp: number;

    constructor(public name: string, hp: number) {
        super(); // Init Subject
        this.name = name;
        this.hp = hp;
        this.maxHp = hp;
        this.state = new NormalState(); // Default State
    }

    public setState(newState: IHeroState): void {
        this.state = newState;
        console.log(`[STATUS CHANGE] ${this.name} sekarang: ${newState.constructor.name}`);
        this.notify(); // Beritahu UI kalau status berubah
    }

    // --- Action Methods ---
    
    public attack(): void {
        this.state.attack(this);
    }

    public takeDamage(amount: number): void {
        // Delegasi logic damage ke State (apakah normal/stunned/dead?)
        this.state.takeDamage(this, amount);
        
        // Logic clamping HP
        if (this.hp < 0) this.hp = 0;
        
        // Beritahu Observer (UI/Audio)
        this.notify(); 
    }

    public heal(amount: number): void {
        this.hp += amount;
        if (this.hp > this.maxHp) this.hp = this.maxHp;
        console.log(`${this.name} healing ${amount} HP.`);
        this.notify();
    }
}