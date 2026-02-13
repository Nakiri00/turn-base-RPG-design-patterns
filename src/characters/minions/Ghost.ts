import type { IMinion } from "./interfaces/IMinion";

export class Ghost implements IMinion {
    private id: string = "Original";

    constructor(public transparency: number) {}

    public clone(): IMinion {
        return new Ghost(this.transparency);
    }

    public setId(id: string): void {
        this.id = id;
    }

    public showDetails(): void {
        console.log(`Ghost [${this.id}] - Transparency: ${this.transparency}%`);
    }
}