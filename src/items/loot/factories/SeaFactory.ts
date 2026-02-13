import type { ILootFactory } from "../interfaces/ILootFactory";
import type { ILootWeapon, ILootArmor } from "../interfaces/ILootItem";
import { ScaleMail, Trident } from "../types/SeaType";
export class SeaFactory implements ILootFactory {
    public createWeapon(): ILootWeapon { return new Trident(); }
    public createArmor(): ILootArmor { return new ScaleMail(); }
}