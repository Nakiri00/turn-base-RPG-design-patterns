import { Hero } from "../characters/Hero";
import { Goblin } from "../characters/enemies/types/Goblin";
import { AggressiveStrategy } from "../characters/enemies/strategies/AggresiveStrategy";
import { DefensiveStrategy } from "../characters/enemies/strategies/DefensiveStrategy";
import { GameUnit } from "../systems/battle/GameUnit";
import { MoveCommand } from "../systems/battle/commands/MoveCommand";
import { CommandHistory } from "../systems/battle/CommandHistory";
import { HealthBarUI } from "../systems/observers/HealthBarUI";
import { AchievementSystem } from "../systems/observers/Achievement";
import { AudioSystem } from "../systems/observers/AudioSystem";

// 9. STATE
export function runStateDemo() {
    console.log("=== STATE: HERO CONDITION ===");
    const hero = new Hero("Mep", 100);
    
    hero.attack();
    hero.takeDamage(60); 
    hero.attack();
}

// 10. STRATEGY
export function runStrategyDemo() {
    console.log("\n=== STRATEGY: ENEMY AI ===");
    const goblin = new Goblin();
    goblin.performAction(); 
    
    goblin.setStrategy(new AggressiveStrategy());
    goblin.performAction(); 
    
    goblin.setStrategy(new DefensiveStrategy());
    goblin.performAction();
}

// 11. OBSERVER
export function runObserverDemo() {
    console.log("=== OBSERVER: EVENT SYSTEM ===");
    
    const hero = new Hero("Mep", 100);

    const ui = new HealthBarUI();
    const achievement = new AchievementSystem();
    const audio = new AudioSystem();

    hero.attach(ui);
    hero.attach(achievement);
    hero.attach(audio);


    console.log("\n>>> EVENT 1: Serangan Kecil");
    hero.takeDamage(20); 

    console.log("\n>>> EVENT 2: Serangan Boss (Critical)");
    hero.takeDamage(75); 

    console.log("\n>>> EVENT 3: Fatality");
    hero.takeDamage(10);

    console.log("\n>>> EVENT 4: User Menyembunyikan UI (Detach)");
    hero.detach(ui);
    hero.heal(50); 
}

// 12. COMMAND
export function runCommandDemo() {
    console.log("\n=== COMMAND: BATTLE HISTORY ===");
    const unit = new GameUnit("Soldier", 0, 0, 100);
    const history = new CommandHistory();
    const move = new MoveCommand(unit, 5, 5);

    history.executeCommand(move); 
    history.undoLast();           
}