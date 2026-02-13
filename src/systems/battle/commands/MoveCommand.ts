import type { ICommand } from "../interfaces/ICommand";
import { GameUnit } from "../GameUnit";

export class MoveCommand implements ICommand {
    // Kita perlu menyimpan state SEBELUM aksi (untuk undo)
    private prevX?: number;
    private prevY?: number;

    constructor(
        private unit: GameUnit, 
        private targetX: number, 
        private targetY: number
    ) {}

    public execute(): void {
        // 1. Simpan posisi lama
        this.prevX = this.unit.x;
        this.prevY = this.unit.y;
        
        // 2. Lakukan aksi
        this.unit.moveTo(this.targetX, this.targetY);
    }

    public undo(): void {
        console.log(`[UNDO] Membatalkan gerakan ${this.unit.name}...`);
        // 3. Kembalikan ke posisi lama
        // Gunakan nilai default 0 jika undefined (safety check)
        this.unit.moveTo(this.prevX ?? 0, this.prevY ?? 0);
    }
}