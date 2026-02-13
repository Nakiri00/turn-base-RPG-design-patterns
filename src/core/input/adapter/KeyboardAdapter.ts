import type { IInputHandler } from "../interfaces/IInputHandler";
import { KeyboardDriver } from "../drivers/KeyboardDriver";

export class KeyboardAdapter implements IInputHandler {
    constructor(private driver: KeyboardDriver) {}

    public handleMove(): void {
        const key = this.driver.getKeyPressed();
        if (key === "W") {
            console.log("[KeyboardAdapter] Tombol 'W' ditekan -> Hero Maju.");
        }
    }

    public handleAttack(): void {
        const space = this.driver.isSpacePressed();
        if (space) {
            console.log("[KeyboardAdapter] Tombol 'Spasi' ditekan -> Hero Menyerang!");
        }
    }
}