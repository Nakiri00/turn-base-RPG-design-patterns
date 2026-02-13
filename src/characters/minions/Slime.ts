import type { IMinion } from "./interfaces/IMinion";

export class Slime implements IMinion {
    private id: string = "Original";

    constructor(public color: string, public hp: number) {
        console.log(`[Heavy Process] Loading Texture for ${color} Slime...`);
    }

    public clone(): IMinion {
        // Shallow copy cukup untuk properti sederhana
        return new Slime(this.color, this.hp);
    }

    public setId(id: string): void {
        this.id = id;
    }

    public showDetails(): void {
        console.log(`Slime [${this.id}] - Color: ${this.color}, HP: ${this.hp}`);
    }
}