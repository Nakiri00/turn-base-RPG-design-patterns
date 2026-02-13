import type { IHeroState } from "../interfaces/IHeroState";
import { Hero } from "../../Hero";
import { NormalState } from "./NormalState";
import { DeadState } from "./DeadState";

export class StunnedState implements IHeroState {
    public attack(hero: Hero): void {
        console.log(`${hero.name} mencoba menyerang... tapi pusing! (Gagal)`);
        console.log("Kesadarannya mulai pulih...");
        hero.setState(new NormalState());
    }

    public takeDamage(hero: Hero, amount: number): void {
        const criticalDmg = amount * 2;
        hero.hp -= criticalDmg;
        console.log(`CRITICAL HIT saat Stunned! ${criticalDmg} damage!`);

        if (hero.hp <= 0) {
            hero.setState(new DeadState());
        }
    }
}