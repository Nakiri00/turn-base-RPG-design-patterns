import type { IItem } from "../interfaces/IItem";

export class Item implements IItem {
    constructor(
        private name: string,
        private weight: number
    ) {}

    public getName(): string {
        return this.name;
    }

    public getWeight(): number {
        return this.weight;
    }

    public display(indent: string): void {
        console.log(`${indent}- ${this.name} (${this.weight} kg)`);
    }
}