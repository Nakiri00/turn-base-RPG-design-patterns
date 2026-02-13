import type { IHeroState } from "../interfaces/IHeroState";
import { Hero } from "../../Hero";

export class DeadState implements IHeroState {
    public attack(hero: Hero): void {
        console.log(`${hero.name} sudah mati. Tidak bisa bergerak.`);
    }

    public takeDamage(hero: Hero, amount: number): void {
        console.log("Memukul mayat tidak ada gunanya...");
    }
}