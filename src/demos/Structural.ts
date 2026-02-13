import { IronSword } from "../items/weapons/BaseWeapon";
import { FireEnchantment } from "../items/weapons/enchanments/FireEnchantment";
import { IceEnchantment } from "../items/weapons/enchanments/IceEnchantment";
import { LegendaryGem } from "../items/weapons/enchanments/LegendaryGem";
import { Container } from "../items/inventory/Container";
import { Item } from "../items/inventory/Item";
import { GameMap } from "../world/map/GameMap";
import { KeyboardDriver } from "../core/input/drivers/KeyboardDriver";
import { KeyboardAdapter } from "../core/input/adapter/KeyboardAdapter";
import { GamepadDriver } from "../core/input/drivers/GamepadDriver";
import { GamepadAdapter } from "../core/input/adapter/GamepadAdapter";

export function runDecoratorDemo() {
    console.log("=== DECORATOR: WEAPON CRAFTING ===");
    
    console.log("--- 1. SENJATA NORMAL ---");
    let weapon = new IronSword();
    console.log(`Weapon: ${weapon.getDescription()} | Damage: ${weapon.getDamage()}`);

    console.log("\n--- 2. UPGRADE: KASIH EFEK API ---");
    weapon = new FireEnchantment(weapon);
    console.log(`Weapon: ${weapon.getDescription()} | Damage: ${weapon.getDamage()}`);

    console.log("\n--- 3. UPGRADE: KASIH EFEK ES JUGA ---");
    weapon = new IceEnchantment(weapon);
    console.log(`Weapon: ${weapon.getDescription()} | Damage: ${weapon.getDamage()}`);

    console.log("\n--- 4. UPGRADE: PAKAI GEM LEGENDARIS ---");
    weapon = new LegendaryGem(weapon);
    console.log(`Weapon: ${weapon.getDescription()} | Damage: ${weapon.getDamage()}`);
}

export function runCompositeDemo() {
    console.log("\n=== COMPOSITE: INVENTORY ===");
    const backpack = new Container("Ransel Besar", 1.0);
    const pouch = new Container("Kantong Pinggang", 0.2);
    
    const potion = new Item("Health Potion", 0.5);
    const sword = new Item("Iron Sword", 3.0);
    const coin = new Item("Gold Coin", 0.1);

    pouch.add(coin);
    pouch.add(potion);

    backpack.add(sword);
    backpack.add(pouch); 

    backpack.display("");
    console.log(`Total Berat Beban Hero: ${backpack.getWeight().toFixed(2)} kg`);
}

export function runFlyweightDemo() {
    console.log("\n=== FLYWEIGHT: MAP RENDERING ===");
    const map = new GameMap(20, 20); 
    map.generateTerrain();
    console.log("Rendering Map...");
    map.render();
    console.log("(Perhatikan log 'Creating new Flyweight' hanya muncul 3 kali)");
}

export function runAdapterDemo() {
    console.log("\n=== ADAPTER: INPUT SYSTEM ===");
    
    console.log("Scenario: Player menggunakan Keyboard");
    const keyDriver = new KeyboardDriver();
    const keyAdapter = new KeyboardAdapter(keyDriver);
    keyAdapter.handleMove(); 
    keyAdapter.handleAttack();

    console.log("\nScenario: Player berganti ke Gamepad");
    const padDriver = new GamepadDriver();
    const padAdapter = new GamepadAdapter(padDriver);
    padAdapter.handleMove();
    padAdapter.handleAttack();
}