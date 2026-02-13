export class GamepadDriver {
    public getAxisY(): number {
        return 1.0; 
    }

    public getButton(id: number): boolean {
        if (id === 0) return true; 
        return false;
    }
}