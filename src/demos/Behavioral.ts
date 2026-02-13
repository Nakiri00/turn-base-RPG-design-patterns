import { Hero } from "../characters/Hero";
import { Goblin } from "../characters/enemies/types/Goblin";
import { AggressiveStrategy } from "../characters/enemies/strategies/AggresiveStrategy";
import { DefensiveStrategy } from "../characters/enemies/strategies/DefensiveStrategy";
import { HealthBarUI } from "../systems/observers/HealthBarUI";
import { AchievementSystem } from "../systems/observers/Achievement";
import { AudioSystem } from "../systems/observers/AudioSystem";
import { GameUnit } from "../systems/battle/GameUnit";
import { MoveCommand } from "../systems/battle/commands/MoveCommand";
import { HealCommand } from "../systems/battle/commands/HealCommand";
import { CommandHistory } from "../systems/battle/CommandHistory";

export function runStateDemo() {
    console.log("=== STATE: HERO CONDITION ===");
    const hero = new Hero("Mep", 100);
    
    console.log("--- ROUND 1: NORMAL ---");
    hero.attack();
    
    console.log("\n--- ROUND 2: KENA DAMAGE KRITIS ---");
    hero.takeDamage(60); 
    
    console.log("\n--- ROUND 3: COBA SERANG SAAT STUNNED ---");
    hero.attack(); 

    console.log("\n--- ROUND 4: MATI ---");
    hero.takeDamage(50); 
    hero.attack();
}

export function runStrategyDemo() {
    console.log("\n=== STRATEGY: ENEMY AI ===");
    const goblin = new Goblin();
    
    console.log("--- FASE 1: AWAL (PASSIVE) ---");
    goblin.performAction(); 
    
    console.log("\n--- FASE 2: PLAYER TERDETEKSI (AGGRESSIVE) ---");
    goblin.setStrategy(new AggressiveStrategy());
    goblin.performAction();
    
    console.log("\n--- FASE 3: SEKARAT (DEFENSIVE) ---");
    goblin.hp = 20;
    if (goblin.hp < 30) {
        goblin.setStrategy(new DefensiveStrategy());
    }
    goblin.performAction();
}

export function runObserverDemo() {
    console.log("\n=== OBSERVER: EVENT SYSTEM ===");
    const hero = new Hero("Mep", 100);
    const ui = new HealthBarUI();
    const achievement = new AchievementSystem();
    const audio = new AudioSystem();

    hero.attach(ui);
    hero.attach(achievement);
    hero.attach(audio);

    console.log("\n>>> EVENT 1: Serangan Kecil");
    hero.takeDamage(20); 

    console.log("\n>>> EVENT 2: Serangan Boss");
    hero.takeDamage(75); 

    console.log("\n>>> EVENT 3: Fatality");
    hero.takeDamage(10);
}

export function runCommandDemo() {
    console.log("\n=== COMMAND: BATTLE HISTORY ===");
    const unit = new GameUnit("Hero", 0, 0, 100);
    const history = new CommandHistory();
    
    console.log("--- TURN 1: Move ---");
    const move = new MoveCommand(unit, 5, 5);
    history.executeCommand(move);
    
    console.log("\n--- TURN 2: Heal ---");
    const heal = new HealCommand(unit, 50);
    history.executeCommand(heal);

    console.log("\n--- UNDO LAST ACTION (Heal) ---");
    history.undoLast();

    console.log("\n--- UNDO LAST ACTION (Move) ---");
    history.undoLast();
}