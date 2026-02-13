import { Tile } from "./Tile";

export class TileFactory {
    private static tileTypes: { [key: string]: Tile } = {};

    public static getTile(name: string, texture: string, cost: number, walkable: boolean): Tile {
        if (!this.tileTypes[name]) {
            this.tileTypes[name] = new Tile(name, texture, cost, walkable);
            console.log(`[Factory] Creating new Flyweight: ${name}`);
        }
        return this.tileTypes[name]!;
    }
}