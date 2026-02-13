import { MonsterFactory } from "./MonsterFactory";
import { Enemy } from "../Enemy";
import { Goblin } from "../types/Goblin";
import { Orc } from "../types/Orc";

export class CaveFactory extends MonsterFactory {
    public createEnemy(): Enemy {
        const randomNum = Math.random();
        if (randomNum < 0.7) {
            return new Goblin();
        } else {
            return new Orc();
        }
    }
}