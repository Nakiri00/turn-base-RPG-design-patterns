import type { IWeapon } from "../interfaces/IWeapon";

export abstract class WeaponDecorator implements IWeapon {
    protected wrappedWeapon: IWeapon;

    constructor(weapon: IWeapon) {
        this.wrappedWeapon = weapon;
    }

    public getDamage(): number {
        return this.wrappedWeapon.getDamage();
    }

    public getDescription(): string {
        return this.wrappedWeapon.getDescription();
    }
}