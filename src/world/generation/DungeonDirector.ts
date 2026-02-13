import type { IDungeonBuilder } from "./interfaces/IDungeonBuilder";

export class DungeonDirector {
    public constructTutorialLevel(builder: IDungeonBuilder): void {
        builder.reset()
            .setName("Level 0: Training Ground")
            .setTerrain("Grass")
            .setLighting("Bright Sun")
            .addRoom("Entrance Hall")
            .addRoom("Dummy Practice Room")
            .addMonster("Wooden Dummy");
    }

    public constructBossLevel(builder: IDungeonBuilder): void {
        builder.reset()
            .setName("Level 99: Dragon's Lair")
            .setTerrain("Lava Rock")
            .setLighting("Dark Red Glow")
            .addTrap()
            .addRoom("Throne Room")
            .addMonster("Ancient Red Dragon")
            .addMonster("Minion Imp");
    }
}