export function runAdapterDemo(){
    // ==========================================
    // 1. TARGET INTERFACE
    // ==========================================
    // Ini adalah "bahasa" yang dimengerti oleh Game Engine kita.
    interface IInputHandler {
        handleMove(): void;
        handleAttack(): void;
    }

    // ==========================================
    // 2. ADAPTEE (Pihak Ketiga / Incompatible)
    // ==========================================
    // Anggap class ini dari library luar yang tidak bisa kita ubah kodenya.

    class KeyboardDriver {
        // Keyboard bicara soal "Key Code"
        public getKeyPressed(): string {
            // Simulasi user menekan tombol 'W'
            return "W"; 
        }
        
        public isSpacePressed(): boolean {
            // Simulasi user menekan Spasi
            return true; 
        }
    }

    class GamepadDriver {
        // Gamepad bicara soal "Button Index" & "Axis"
        public getAxisY(): number {
            // Simulasi analog stick didorong ke atas (nilai 1.0)
            return 1.0; 
        }

        public getButton(id: number): boolean {
            // Simulasi tombol 'X' (id 0) ditekan
            if (id === 0) return true; 
            return false;
        }
    }

    // ==========================================
    // 3. ADAPTER (Penerjemah)
    // ==========================================

    // Adapter untuk Keyboard
    class KeyboardAdapter implements IInputHandler {
        constructor(private driver: KeyboardDriver) {}

        public handleMove(): void {
            const key = this.driver.getKeyPressed();
            // Terjemahkan 'W' menjadi Gerakan Maju
            if (key === "W") {
                console.log("[KeyboardAdapter] Tombol 'W' ditekan -> Hero Maju.");
            }
        }

        public handleAttack(): void {
            const space = this.driver.isSpacePressed();
            // Terjemahkan 'Spasi' menjadi Serangan
            if (space) {
                console.log("[KeyboardAdapter] Tombol 'Spasi' ditekan -> Hero Menyerang!");
            }
        }
    }

    // Adapter untuk Gamepad
    class GamepadAdapter implements IInputHandler {
        constructor(private driver: GamepadDriver) {}

        public handleMove(): void {
            const axis = this.driver.getAxisY();
            // Terjemahkan Analog Stick > 0.5 menjadi Gerakan Maju
            if (axis > 0.5) {
                console.log("[GamepadAdapter] Analog Stick Atas (1.0) -> Hero Maju.");
            }
        }

        public handleAttack(): void {
            const btnX = this.driver.getButton(0); // Tombol 0 = Tombol X di stik PS
            // Terjemahkan Tombol 0 menjadi Serangan
            if (btnX) {
                console.log("[GamepadAdapter] Tombol X (Index 0) ditekan -> Hero Menyerang!");
            }
        }
    }

    // ==========================================
    // 4. CLIENT (Game Engine)
    // ==========================================
    class GameEngine {
        private input!: IInputHandler;

        // Game Engine bisa dipasangi adapter apa saja (Polimorfisme)
        public setInputDevice(device: IInputHandler) {
            this.input = device;
        }

        public update() {
            console.log("--- GAME LOOP UPDATE ---");
            // Game Engine tidak tahu itu keyboard atau gamepad
            // Dia cuma panggil handleMove() dan handleAttack()
            if (this.input) {
                this.input.handleMove();
                this.input.handleAttack();
            }
        }
    }

    // --- SIMULASI ---

    const game = new GameEngine();

    // Skenario 1: User main di PC pakai Keyboard
    console.log("Scenario: Player menggunakan Keyboard");
    const myKeyboard = new KeyboardDriver();
    const keyboardAdapter = new KeyboardAdapter(myKeyboard);

    game.setInputDevice(keyboardAdapter); // Colok adapter keyboard
    game.update(); 

    // Skenario 2: User ganti ke Controller PS5
    console.log("\nScenario: Player berganti ke Gamepad");
    const myGamepad = new GamepadDriver();
    const gamepadAdapter = new GamepadAdapter(myGamepad);

    game.setInputDevice(gamepadAdapter); // Colok adapter gamepad
    game.update();
}