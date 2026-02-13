// Import factory yang sudah kita refactor
import { CaveFactory } from "../characters/enemies/spawner/CaveFactory";
import { GraveyardFactory } from "../characters/enemies/spawner/GraveyardFactory";
import { Slime } from "../characters/minions/Slime";
import { ForestFactory } from "../items/loot/factories/ForestFactory";
import { SeaFactory } from "../items/loot/factories/SeaFactory";
import { DungeonBuilder } from "../world/generation/builders/DungeonBuilder";
import { DungeonDirector } from "../world/generation/DungeonDirector";

export function runFactoryDemo() {
    console.log("=== FACTORY METHOD: SPAWNING MONSTERS ===");
    console.log("Level 1: Masuk Gua");
    const cave = new CaveFactory();
    cave.spawnMonster(); 

    console.log("\nLevel 2: Masuk Kuburan");
    const grave = new GraveyardFactory();
    grave.spawnMonster(); 
}

export function runAbstractDemo() {
    console.log("\n=== ABSTRACT FACTORY: LOOT SYSTEM ===");
    
    console.log("Scenario: Loot dari Hutan Elf");
    const forestLoot = new ForestFactory();
    const bow = forestLoot.createWeapon();
    const tunic = forestLoot.createArmor();
    console.log(`Dapat: ${bow.getDescription()} & ${tunic.getDescription()}`);
    bow.attack();

    console.log("\nScenario: Loot dari Istana Laut");
    const seaLoot = new SeaFactory();
    const trident = seaLoot.createWeapon();
    const mail = seaLoot.createArmor();
    console.log(`Dapat: ${trident.getDescription()} & ${mail.getDescription()}`);
    trident.attack();
}

export function runBuilderDemo() {
    console.log("\n=== BUILDER: DUNGEON GENERATION ===");
    const builder = new DungeonBuilder();
    const director = new DungeonDirector();

    console.log("--- CARA 1: Pake Director (Resep Baku) ---");
    director.constructBossLevel(builder);
    const bossLevel = builder.build();
    bossLevel.showSpecs();

    console.log("\n--- CARA 2: Custom Manual ---");
    const secretLevel = builder.reset()
        .setName("Secret Cow Level")
        .setTerrain("Pasture")
        .addRoom("Barn")
        .addMonster("Cow King")
        .build();
    secretLevel.showSpecs();
}

export function runPrototypeDemo() {
    console.log("\n=== PROTOTYPE: MINION CLONING ===");
    console.log("PHASE 1: Inisialisasi Master (Berat)");
    const masterSlime = new Slime("Green", 50);
    
    console.log("\nPHASE 2: Cloning Massal (Cepat)");
    const army = [];
    for(let i=1; i<=3; i++) {
        const clone = masterSlime.clone();
        clone.setId(`Clone-${i}`);
        army.push(clone);
    }
    
    army.forEach(m => m.showDetails());
}