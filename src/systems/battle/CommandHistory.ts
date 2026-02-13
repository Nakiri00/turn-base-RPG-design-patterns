import type { ICommand } from "./interfaces/ICommand";

export class CommandHistory {
    private history: ICommand[] = [];

    public executeCommand(command: ICommand): void {
        command.execute();
        this.history.push(command); 
    }

    public undoLast(): void {
        if (this.history.length > 0) {
            const lastCommand = this.history.pop(); 
            if (lastCommand) lastCommand.undo();
        } else {
            console.log("[SYSTEM] Tidak ada aksi untuk dibatalkan.");
        }
    }
}