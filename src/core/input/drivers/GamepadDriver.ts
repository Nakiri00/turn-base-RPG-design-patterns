export class GamepadDriver {
    public getAxisY(): number {
        return 1.0; // Simulasi analog stick didorong ke atas
    }

    public getButton(id: number): boolean {
        if (id === 0) return true; // Simulasi tombol 'X' (id 0) ditekan
        return false;
    }
}