import type { ILootWeapon, ILootArmor } from "./ILootItem";

export interface ILootFactory {
    createWeapon(): ILootWeapon;
    createArmor(): ILootArmor;
}