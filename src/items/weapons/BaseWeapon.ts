import type { IWeapon } from "../interfaces/IWeapon";

export class IronSword implements IWeapon {
    public getDamage(): number { return 10; }
    public getDescription(): string { return "Iron Sword"; }
}

export class MagicStaff implements IWeapon {
    public getDamage(): number { return 5; }
    public getDescription(): string { return "Wooden Staff"; }
}