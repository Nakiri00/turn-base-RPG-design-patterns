export interface IMinion {
    clone(): IMinion;
    showDetails(): void;
    setId(id: string): void;
}