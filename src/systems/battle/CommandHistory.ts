import type { ICommand } from "./interfaces/ICommand";

export class CommandHistory {
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