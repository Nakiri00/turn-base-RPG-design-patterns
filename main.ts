import * as readline from 'readline';

import { runFactoryDemo, runAbstractDemo, runBuilderDemo, runPrototypeDemo } from "./src/demos/Creational";
import { runDecoratorDemo, runCompositeDemo, runFlyweightDemo, runAdapterDemo } from "./src/demos/Structural";
import { runStateDemo, runStrategyDemo, runObserverDemo, runCommandDemo } from "./src/demos/Behavioral";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const color = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    cyan: "\x1b[36m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    red: "\x1b[31m",
};

function clearScreen() {
    console.clear();
    process.stdout.write('\x1B[2J\x1B[0f\x1B[3J');
}
function printHeader() {
    console.log(color.bright + "ETERNAL DUNGEON: DESIGN PATTERNS SHOWCASE" + color.reset);
}

// --- MENU UTAMA ---
function showMenu() {
    console.log(color.yellow + "PILIH DEMO DESIGN PATTERN" + color.reset);
    
    console.log(color.bright + "\n[ CREATIONAL ]" + color.reset);
    console.log("1. Factory Method    (Monster Spawning)");
    console.log("2. Abstract Factory  (Loot Drop System)");
    console.log("3. Builder           (Dungeon Generation)");
    console.log("4. Prototype         (Minion Cloning)");

    console.log(color.bright + "\n[ STRUCTURAL ]" + color.reset);
    console.log("5. Decorator         (Weapon Enchantment)");
    console.log("6. Composite         (Inventory Bag)");
    console.log("7. Flyweight         (Map Tile Optimization)");
    console.log("8. Adapter           (Input Controller)");

    console.log(color.bright + "\n[ BEHAVIORAL ]" + color.reset);
    console.log("9. State             (Character Conditions)");
    console.log("10. Strategy         (Enemy AI Behavior)");
    console.log("11. Observer         (UI & Achievements)");
    console.log("12. Command          (Battle Actions & Undo)");

    console.log(color.red + "\n0. KELUAR (EXIT)" + color.reset);
    
    rl.question(color.cyan + "\nMasukkan nomor pilihan (0-12): " + color.reset, (choice) => {
        handleInput(choice);
    });
}

function handleInput(choice: string) {
    console.log("\n"); 
    switch (choice) {
        // --- CREATIONAL ---
        case '1': runFactoryDemo(); break;
        case '2': runAbstractDemo(); break;
        case '3': runBuilderDemo(); break;
        case '4': runPrototypeDemo(); break;

        // --- STRUCTURAL ---
        case '5': runDecoratorDemo(); break;
        case '6': runCompositeDemo(); break;
        case '7': runFlyweightDemo(); break;
        case '8': runAdapterDemo(); break;

        // --- BEHAVIORAL ---
        case '9': runStateDemo(); break;
        case '10': runStrategyDemo(); break;
        case '11': runObserverDemo(); break;
        case '12': runCommandDemo(); break;

        case '0':
            console.log(color.green + "Terima kasih telah mencoba demo kami! Sampai jumpa." + color.reset);
            rl.close();
            return; 

        default:
            console.log(color.red + "Pilihan tidak valid! Silakan pilih nomor 0-12." + color.reset);
    }

    rl.question("\nTekan [ENTER] untuk kembali ke menu utama...", () => {
        clearScreen();
        printHeader();
        showMenu();
    });
}

clearScreen();
printHeader();
showMenu();