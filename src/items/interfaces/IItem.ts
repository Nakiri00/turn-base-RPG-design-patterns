export interface IItem {
    getName(): string;
    getWeight(): number; // Satuan Kg
    display(indent: string): void; // Untuk visualisasi struktur
}