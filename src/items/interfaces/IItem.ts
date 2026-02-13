export interface IItem {
    getName(): string;
    getWeight(): number; 
    display(indent: string): void; 
}