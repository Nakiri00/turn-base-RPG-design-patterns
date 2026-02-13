import { MonsterFactory } from "./MonsterFactory";
import { Enemy } from "../Enemy";
import { Skeleton } from "../types/Skeleton";

export class GraveyardFactory extends MonsterFactory {
    public createEnemy(): Enemy {
        return new Skeleton();
    }
}