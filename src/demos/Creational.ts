// Import factory yang sudah kita refactor
import { CaveFactory } from "../characters/enemies/spawner/CaveFactory";
import { GraveyardFactory } from "../characters/enemies/spawner/GraveyardFactory";
import { Slime } from "../characters/minions/Slime";
import { ForestFactory } from "../items/loot/factories/ForestFactory";
import { SeaFactory } from "../items/loot/factories/SeaFactory";
import { DungeonBuilder } from "../world/generation/builders/DungeonBuilder";
import { DungeonDirector } from "../world/generation/DungeonDirector";

// 1. FACTORY METHOD
export function runFactoryDemo() {
    console.log("=== FACTORY METHOD: SPAWNING MONSTERS ===");
    const cave = new CaveFactory();
    const grave = new GraveyardFactory();

    cave.spawnMonster(); 
    grave.spawnMonster(); 
}

// 2. ABSTRACT FACTORY
export function runAbstractDemo() {
    console.log("\n=== ABSTRACT FACTORY: LOOT SYSTEM ===");
    const forestLoot = new ForestFactory();
    
    const bow = forestLoot.createWeapon();
    const armor = forestLoot.createArmor();

    console.log(`Dapat Loot: ${bow.getDescription()} & ${armor.getDescription()}`);
    bow.attack();
}

// 3. BUILDER
export function runBuilderDemo() {
    console.log("\n=== BUILDER: DUNGEON GENERATION ===");
    const builder = new DungeonBuilder();
    const director = new DungeonDirector();

    director.constructBossLevel(builder);
    const level = builder.build();
    level.showSpecs();
}

// 4. PROTOTYPE
export function runPrototypeDemo() {
    console.log("\n=== PROTOTYPE: MINION CLONING ===");
    const masterSlime = new Slime("Green", 50);
    
    const clone1 = masterSlime.clone();
    clone1.setId("Clone-1");
    clone1.showDetails();
}