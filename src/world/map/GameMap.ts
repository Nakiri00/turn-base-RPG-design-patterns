import { Tile } from "./Tile";
import { TileFactory } from "./TileFactory";

export class GameMap {
    private tiles: Tile[][] = [];

    constructor(private width: number, private height: number) {}

    public generateTerrain(): void {
        this.tiles = []; 

        for (let y = 0; y < this.height; y++) {
            const row: Tile[] = []; 
            for (let x = 0; x < this.width; x++) {
                let type: Tile;

                // Logika prosedural sederhana
                if (x === 0 || x === this.width - 1 || y === 0 || y === this.height - 1) {
                    type = TileFactory.getTile("Stone", "stone.png", 0, false);
                } else if (x > 5 && x < 10 && y > 5 && y < 10) {
                    type = TileFactory.getTile("Water", "water.png", 5, true);
                } else {
                    type = TileFactory.getTile("Grass", "grass.png", 1, true);
                }
                row.push(type);
            }
            this.tiles.push(row);
        }
    }

    public render(): void {
        const canvas: string[][] = Array(this.height).fill(null).map(() => Array(this.width).fill(" "));

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                // Minta Flyweight untuk menggambar dirinya di posisi x,y
                this.tiles[y]?.[x]?.draw(canvas, x, y);
            }
        }
        console.log(canvas.map(row => row.join(" ")).join("\n"));
    }
}