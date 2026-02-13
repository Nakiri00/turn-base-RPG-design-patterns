export class GameUnit {
    constructor(
        public name: string, 
        public x: number, 
        public y: number,
        public hp: number
    ) {}

    public moveTo(newX: number, newY: number): void {
        console.log(`[ACTION] ${this.name} bergerak dari (${this.x}, ${this.y}) ke (${newX}, ${newY}).`);
        this.x = newX;
        this.y = newY;
    }

    public heal(amount: number): void {
        this.hp += amount;
        console.log(`[ACTION] ${this.name} dipulihkan ${amount} HP. (Total: ${this.hp})`);
    }

    public takeDamage(amount: number): void {
        this.hp -= amount;
        console.log(`[ACTION] ${this.name} terkena ${amount} damage. (Sisa: ${this.hp})`);
    }
}