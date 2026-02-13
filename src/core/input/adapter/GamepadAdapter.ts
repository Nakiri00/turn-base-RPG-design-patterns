import type { IInputHandler } from "../interfaces/IInputHandler";
import { GamepadDriver } from "../drivers/GamepadDriver";

export class GamepadAdapter implements IInputHandler {
    constructor(private driver: GamepadDriver) {}

    public handleMove(): void {
        const axis = this.driver.getAxisY();
        if (axis > 0.5) {
            console.log("[GamepadAdapter] Analog Stick Atas (1.0) -> Hero Maju.");
        }
    }

    public handleAttack(): void {
        const btnX = this.driver.getButton(0);
        if (btnX) {
            console.log("[GamepadAdapter] Tombol X (Index 0) ditekan -> Hero Menyerang!");
        }
    }
}