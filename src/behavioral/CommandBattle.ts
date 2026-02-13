export function runCommandDemo() {
    // ==========================================
    // 1. RECEIVER (Objek yang dimanipulasi)
    // ==========================================
    class GameUnit {
        constructor(
            public name: string, 
            public x: number, 
            public y: number,
            public hp: number
        ) {}

        public moveTo(newX: number, newY: number): void {
            console.log(`[ACTION] ${this.name} bergerak dari (${this.x}, ${this.y}) ke (${newX}, ${newY}).`);
            this.x = newX;
            this.y = newY;
        }

        public heal(amount: number): void {
            this.hp += amount;
            console.log(`[ACTION] ${this.name} dipulihkan ${amount} HP. (Total: ${this.hp})`);
        }

        public takeDamage(amount: number): void {
            this.hp -= amount;
            console.log(`[ACTION] ${this.name} terkena ${amount} damage. (Sisa: ${this.hp})`);
        }
    }

    // ==========================================
    // 2. COMMAND INTERFACE
    // ==========================================
    interface ICommand {
        execute(): void;
        undo(): void;
    }

    // ==========================================
    // 3. CONCRETE COMMANDS (Perintah Nyata)
    // ==========================================

    // Perintah: Gerakan
    class MoveCommand implements ICommand {
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
            this.unit.moveTo(this.prevX !== undefined ? this.prevX : 0, this.prevY !== undefined ? this.prevY : 0);;
        }
    }

    // Perintah: Healing
    class HealCommand implements ICommand {
        constructor(
            private unit: GameUnit, 
            private amount: number
        ) {}

        public execute(): void {
            this.unit.heal(this.amount);
        }

        public undo(): void {
            console.log(`[UNDO] Membatalkan healing ${this.unit.name}...`);
            // Kebalikan dari Heal adalah Damage (Take Damage)
            this.unit.takeDamage(this.amount);
        }
    }

    // ==========================================
    // 4. INVOKER (History Manager)
    // ==========================================
    class CommandHistory {
        // Stack: Tumpukan kartu perintah
        private history: ICommand[] = [];

        public executeCommand(command: ICommand): void {
            command.execute();
            this.history.push(command); // Masukkan ke tumpukan paling atas
        }

        public undoLast(): void {
            if (this.history.length > 0) {
                const lastCommand = this.history.pop(); // Ambil dari tumpukan paling atas
                if (lastCommand) lastCommand.undo();
            } else {
                console.log("[SYSTEM] Tidak ada aksi untuk dibatalkan.");
            }
        }
    }

    // ==========================================
    // 5. CLIENT CODE (Simulasi Turn)
    // ==========================================

    const hero = new GameUnit("Hero", 0, 0, 100);
    const history = new CommandHistory();

    console.log("=== TURN 1: PERGERAKAN ===");
    // Player klik: Pindah ke (5, 5)
    const move1 = new MoveCommand(hero, 5, 5);
    history.executeCommand(move1); 
    // Output: Hero bergerak ke (5, 5)

    console.log("\n=== TURN 2: SALAH LANGKAH ===");
    // Player klik: Pindah ke (10, 10) -> Eh ternyata jurang!
    const move2 = new MoveCommand(hero, 10, 10);
    history.executeCommand(move2);
    // Output: Hero bergerak ke (10, 10)

    console.log("\n=== PLAYER PANIK: TEKAN CTRL+Z (UNDO) ===");
    history.undoLast();
    // Output: Undo gerakan... Hero balik ke (5, 5)

    console.log("\n=== TURN 3: HEALING ===");
    const heal1 = new HealCommand(hero, 50);
    history.executeCommand(heal1);
    // Output: Hero heal 50 HP

    console.log("\n=== UNDO HEALING (CHANGE MIND) ===");
    history.undoLast();
    // Output: Undo healing... Hero kena damage 50 (kembali ke HP awal)
}
