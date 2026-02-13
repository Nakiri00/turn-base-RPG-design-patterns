export class DungeonLevel {
    public name: string = "Unknown Level";
    public terrain: string = "Dirt";
    public rooms: string[] = [];
    public monsters: string[] = [];
    public hasTrap: boolean = false;
    public ambientLight: string = "Dim";

    public showSpecs(): void {
        console.log(`\n=== DUNGEON MANIFEST: ${this.name} ===`);
        console.log(`- Terrain  : ${this.terrain}`);
        console.log(`- Lighting : ${this.ambientLight}`);
        console.log(`- Rooms    : [${this.rooms.join(", ")}]`);
        console.log(`- Monsters : [${this.monsters.join(", ")}]`);
        console.log(`- Traps    : ${this.hasTrap ? "YES (DANGER!)" : "None"}`);
        console.log("========================================");
    }
}