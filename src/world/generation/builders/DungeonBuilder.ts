import type { IDungeonBuilder } from "../interfaces/IDungeonBuilder";
import { DungeonLevel } from "../DungeonLevel";

export class DungeonBuilder implements IDungeonBuilder {
    private level: DungeonLevel = new DungeonLevel();

    constructor() {
        this.reset();
    }

    public reset(): this {
        this.level = new DungeonLevel();
        return this;
    }

    public setName(name: string): this {
        this.level.name = name;
        return this;
    }

    public setTerrain(terrain: string): this {
        this.level.terrain = terrain;
        return this;
    }

    public setLighting(light: string): this {
        this.level.ambientLight = light;
        return this;
    }

    public addRoom(roomName: string): this {
        this.level.rooms.push(roomName);
        return this;
    }

    public addMonster(monsterName: string): this {
        this.level.monsters.push(monsterName);
        return this;
    }

    public addTrap(): this {
        this.level.hasTrap = true;
        return this;
    }

    public build(): DungeonLevel {
        const result = this.level;
        this.reset();
        return result;
    }
}