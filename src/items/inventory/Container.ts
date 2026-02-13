import type { IItem } from "../interfaces/IItem";

export class Container implements IItem {
    private items: IItem[] = [];

    constructor(
        private name: string,
        private selfWeight: number
    ) {}

    public add(item: IItem): void {
        this.items.push(item);
    }

    public remove(item: IItem): void {
        const index = this.items.indexOf(item);
        if (index > -1) {
            this.items.splice(index, 1);
        }
    }

    public getName(): string {
        return this.name;
    }

    public getWeight(): number {
        let totalWeight = this.selfWeight;
        for (const item of this.items) {
            totalWeight += item.getWeight();
        }
        return totalWeight;
    }

    public display(indent: string): void {
        console.log(`${indent}+ [BOX] ${this.name} (Berat Wadah: ${this.selfWeight} kg)`);
        for (const item of this.items) {
            item.display(indent + "  ");
        }
    }
}