import { IronSword } from "../items/weapons/BaseWeapon";
import { FireEnchantment } from "../items/weapons/enchanments/FireEnchantment";
import { Container } from "../items/inventory/Container";
import { Item } from "../items/inventory/Item";
import { GameMap } from "../world/map/GameMap";
import { KeyboardDriver } from "../core/input/drivers/KeyboardDriver";
import { KeyboardAdapter } from "../core/input/adapter/KeyboardAdapter";

// 5. DECORATOR
export function runDecoratorDemo() {
    console.log("=== DECORATOR: WEAPON CRAFTING ===");
    let sword = new IronSword();
    const fireSword = new FireEnchantment(sword); 
    
    console.log(`Weapon: ${fireSword.getDescription()}`);
    console.log(`Damage: ${fireSword.getDamage()}`);
}

// 6. COMPOSITE
export function runCompositeDemo() {
    console.log("\n=== COMPOSITE: INVENTORY ===");
    const backpack = new Container("Backpack", 1.0);
    const potion = new Item("Potion", 0.5);
    
    backpack.add(potion);
    backpack.display("");
    console.log(`Total Berat: ${backpack.getWeight()} kg`);
}

// 7. FLYWEIGHT
export function runFlyweightDemo() {
    console.log("\n=== FLYWEIGHT: MAP RENDERING ===");
    const map = new GameMap(10, 10); 
    map.generateTerrain();
    map.render();
}

// 8. ADAPTER
export function runAdapterDemo() {
    console.log("\n=== ADAPTER: INPUT SYSTEM ===");
    const driver = new KeyboardDriver();
    const adapter = new KeyboardAdapter(driver);

    adapter.handleMove();  
    adapter.handleAttack(); 
}