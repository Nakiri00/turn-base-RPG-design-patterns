export function runBuilderDemo(){
    // ==========================================
    // 1. PRODUCT (Objek Kompleks)
    // ==========================================
    class DungeonLevel {
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

    // ==========================================
    // 2. BUILDER INTERFACE
    // ==========================================
    interface IDungeonBuilder {
        // Menggunakan return 'this' untuk Method Chaining
        reset(): this;
        setName(name: string): this;
        setTerrain(terrain: string): this;
        setLighting(light: string): this;
        addRoom(roomName: string): this;
        addMonster(monsterName: string): this;
        addTrap(): this;
        
        // Metode final untuk mengambil hasil
        build(): DungeonLevel;
    }

    // ==========================================
    // 3. CONCRETE BUILDER
    // ==========================================
    class ConcreteDungeonBuilder implements IDungeonBuilder {
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
            this.reset(); // Reset agar builder siap dipakai lagi
            return result;
        }
    }

    // ==========================================
    // 4. DIRECTOR (Opsional - Sangat disukai Dosen)
    // ==========================================
    // Director mengatur "Resep" pembuatan level standar
    class DungeonDirector {
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

    // ==========================================
    // 5. CLIENT CODE (Main)
    // ==========================================

    const builder = new ConcreteDungeonBuilder();
    const director = new DungeonDirector();

    // CARA 1: Menggunakan Director (Resep Baku)
    console.log("--- CARA 1: Pake Director (Resep Baku) ---");
    director.constructTutorialLevel(builder);
    const tutorialLevel = builder.build();
    tutorialLevel.showSpecs();

    director.constructBossLevel(builder);
    const bossLevel = builder.build();
    bossLevel.showSpecs();

    // CARA 2: Manual / Custom (Tanpa Director)
    // Berguna untuk Procedural Generation yang unik
    console.log("--- CARA 2: Custom Manual (Method Chaining) ---");
    const secretLevel = builder.reset()
                            .setName("Secret Hidden Cow Level")
                            .setTerrain("Pasture")
                            .addRoom("Barn")
                            .addMonster("Hell Bovine")
                            .addMonster("Cow King")
                            .build();
    secretLevel.showSpecs();
    }