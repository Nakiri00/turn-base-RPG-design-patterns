export class Tile {
    constructor(
        private name: string,       // Misal: "Grass", "Water"
        private texture: string,    // Misal: "assets/grass.png"
        private movementCost: number, 
        private isWalkable: boolean
    ) {}

    public getName(): string { return this.name; }

    // Method draw menerima Extrinsic State (x, y) dari luar
    public draw(canvas: string[][], x: number, y: number): void {
        if (canvas[y] !== undefined) {
            const char = this.texture.charAt(0).toUpperCase(); 
            canvas[y][x] = char;
        }
    }
}