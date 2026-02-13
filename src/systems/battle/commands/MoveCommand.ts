import type { ICommand } from "../interfaces/ICommand";
import { GameUnit } from "../GameUnit";

export class MoveCommand implements ICommand {
    private prevX?: number;
    private prevY?: number;

    constructor(
        private unit: GameUnit, 
        private targetX: number, 
        private targetY: number
    ) {}

    public execute(): void {
        this.prevX = this.unit.x;
        this.prevY = this.unit.y;
        
        this.unit.moveTo(this.targetX, this.targetY);
    }

    public undo(): void {
        console.log(`[UNDO] Membatalkan gerakan ${this.unit.name}...`);
        this.unit.moveTo(this.prevX ?? 0, this.prevY ?? 0);
    }
}