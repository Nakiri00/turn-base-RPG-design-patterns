import type { ILootArmor, ILootWeapon } from "../interfaces/ILootItem";

export class Trident implements ILootWeapon {
    attack(): void {
       console.log("Menusuk dengan garpu laut! Jleb! (Damage: 25)");
    }
    getDescription(): string { return "Trisula Poseidon"; }
}
export class ScaleMail implements ILootArmor {
    defend(): void {
        console.log("Sisik naga laut memantulkan pedang. (Defense: 12)");
    }
    getDescription(): string { return "Zirah Sisik Ikan"; }
}