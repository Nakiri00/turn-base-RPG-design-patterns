import type { IObserver } from "../../core/events/interfaces/IObserver";
import type { ISubject } from "../../core/events/interfaces/ISubject";
import { Hero } from "../../characters/Hero";

export class HealthBarUI implements IObserver {
    public update(subject: ISubject): void {
        if (subject instanceof Hero) {
            const percentage = Math.max(0, (subject.hp / subject.maxHp) * 100);
            
            const totalBars = 10;
            const filledBars = Math.max(0, Math.floor(percentage / 10));
            const emptyBars = totalBars - filledBars;
            
            const bar = "█".repeat(filledBars) + "░".repeat(emptyBars);
            const color = percentage < 30 ? "\x1b[31m" : "\x1b[32m";
            const reset = "\x1b[0m";

            console.log(`[UI DISPLAY] HP Bar: ${color}[${bar}] ${percentage.toFixed(0)}%${reset}`);
        }
    }
}