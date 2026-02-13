import * as readline from 'readline';

// 1. Creational
import { runFactoryDemo } from './src/creational/MonsterFactory'; // Sesuaikan nama file dan path
import { runAbstractDemo } from './src/creational/AbstractFactoryLoot';
import { runBuilderDemo } from './src/creational/BuilderDungeon';
import { runPrototypeDemo } from './src/creational/PrototypeMinion';

// 2. Structural
import { runDecoratorDemo } from './src/structural/DecoratorWeapon';
import { runCompositeDemo } from './src/structural/CompositeInventory';
import { runFlyweightDemo } from './src/structural/FlyweightMap';
import { runAdapterDemo } from './src/structural/AdapterInput';

// 3. Behavioral
import { runStateDemo } from './src/behavioral/StateCharacter';
import { runStrategyDemo } from './src/behavioral/StrategyEnemyAI';
import { runObserverDemo } from './src/behavioral/ObserverGameEvents';
import { runCommandDemo } from './src/behavioral/CommandBattle';

// --- KONFIGURASI READLINE ---
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// --- FUNGSI UTILITAS (WARNA & CLEAR SCREEN) ---
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
}

function printHeader() {
    console.log(color.cyan + `
    ███████╗████████╗███████╗██████╗ ███╗   ██╗ █████╗ ██╗     
    ██╔════╝╚══██╔══╝██╔════╝██╔══██╗████╗  ██║██╔══██╗██║     
    █████╗     ██║   █████╗  ██████╔╝██╔██╗ ██║███████║██║     
    ██╔══╝     ██║   ██╔══╝  ██╔══██╗██║╚██╗██║██╔══██║██║     
    ███████╗   ██║   ███████╗██║  ██║██║ ╚████║██║  ██║███████╗
    ╚══════╝   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝
    ` + color.reset);
    console.log(color.bright + "    ETERNAL DUNGEON: DESIGN PATTERNS SHOWCASE" + color.reset);
}

// --- MENU UTAMA ---
function showMenu() {
    console.log(color.yellow + "=== PILIH DEMO DESIGN PATTERN ===" + color.reset);
    
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

// --- LOGIKA HANDLING INPUT ---
function handleInput(choice: string) {
    console.log("\n"); // Spasi biar rapi

    switch (choice) {
        // --- CREATIONAL ---
        case '1':
            // runFactoryMethodDemo(); 
            console.log("Running Factory Demo... (Uncomment import to see real output)");
            break;
        case '2':
            // runAbstractFactoryDemo();
            console.log("Running Abstract Factory Demo...");
            break;
        case '3':
            // runBuilderDemo();
            console.log("Running Builder Demo...");
            break;
        case '4':
            // runPrototypeDemo();
            console.log("Running Prototype Demo...");
            break;

        // --- STRUCTURAL ---
        case '5':
            // runDecoratorDemo();
            console.log("Running Decorator Demo...");
            break;
        case '6':
            // runCompositeDemo();
            console.log("Running Composite Demo...");
            break;
        case '7':
            // runFlyweightDemo();
            console.log("Running Flyweight Demo...");
            break;
        case '8':
            // runAdapterDemo();
            console.log("Running Adapter Demo...");
            break;

        // --- BEHAVIORAL ---
        case '9':
            // runStateDemo();
            console.log("Running State Demo...");
            break;
        case '10':
            // runStrategyDemo();
            console.log("Running Strategy Demo...");
            break;
        case '11':
            // runObserverDemo();
            console.log("Running Observer Demo...");
            break;
        case '12':
            // runCommandDemo();
            console.log("Running Command Demo...");
            break;

        case '0':
            console.log(color.green + "Terima kasih telah mencoba demo kami! Sampai jumpa." + color.reset);
            rl.close();
            return; // Stop program

        default:
            console.log(color.red + "Pilihan tidak valid! Silakan pilih nomor 0-12." + color.reset);
    }

    // Kembali ke menu setelah user menekan Enter
    rl.question("\nTekan [ENTER] untuk kembali ke menu utama...", () => {
        clearScreen();
        printHeader();
        showMenu();
    });
}

// --- JALANKAN PROGRAM ---
clearScreen();
printHeader();
showMenu();