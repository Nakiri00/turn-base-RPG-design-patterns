import { DungeonLevel } from "../DungeonLevel";

export interface IDungeonBuilder {
    reset(): this;
    setName(name: string): this;
    setTerrain(terrain: string): this;
    setLighting(light: string): this;
    addRoom(roomName: string): this;
    addMonster(monsterName: string): this;
    addTrap(): this;
    build(): DungeonLevel;
}