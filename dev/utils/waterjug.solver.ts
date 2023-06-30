import { WaterJugInput, WaterJugOutput } from "../types/WaterJugTypes";


type MainJug = 'x' | 'y';
export class WaterJugSolver {
    private static state: WaterJugOutput = [];

    public static GetState(): WaterJugOutput {
        return this.state;
    }

    public static CanSolve(input: WaterJugInput): boolean {
        if (input.z > input.x && input.z > input.y) {
            return false;
        } else if (input.x % 2 === 0 && input.y % 2 === 0 && input.z % 2 !== 0) {
            return false;
        }
    
        return true;
    }
    
    public static FindSolution(input: WaterJugInput): WaterJugOutput | null {
        try {
            const xSteps: WaterJugOutput = [], ySteps: WaterJugOutput = [];
            this.Solve(0, 0, input, 'x', xSteps);
            this.Solve(0, 0, input, 'y', ySteps);
            
            if (xSteps.length < ySteps.length) {
                this.state = xSteps;
                return this.state;
            }
        
            this.state = ySteps;
            return this.state;
        } catch(_) {
            return null;
        }
    }
    
    private static Solve(x: number, y: number, input: WaterJugInput, mainJug: MainJug, steps: WaterJugOutput) {
        steps.push({ x, y });
    
        if (x === input.z || y === input.z) {
            return;
        }
    
        if (mainJug === 'x') {
            if (y === input.y) {
                this.Solve(x, 0, input, mainJug, steps);
            } else if (x === 0) {
                this.Solve(input.x, y, input, mainJug, steps)
            } else {
                const remSpace = input.y - y;
                const pouredWater = x > remSpace ? remSpace : x;
    
                this.Solve(x - pouredWater, y + pouredWater, input, mainJug, steps);
            }
        } else {
            if (x === input.x) {
                this.Solve(0, y, input, mainJug, steps);
            } else if (y === 0) {
                this.Solve(x, input.y, input, mainJug, steps)
            } else {
                const remSpace = input.x - x;
                const pouredWater = y > remSpace ? remSpace : y;
    
                this.Solve(x + pouredWater, y - pouredWater, input, mainJug, steps);
            }
        }
    }
}