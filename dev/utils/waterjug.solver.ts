import { WaterJugInput, WaterJugOutput } from "../types/WaterJugTypes";

type MainJug = 'x' | 'y';

export abstract class WaterJugSolver {
    private static state: WaterJugOutput = [];

    public static GetState(): WaterJugOutput {
        return this.state;
    }

    /**
     * Check if the given input is a valid input for the Water Jug problem.
     * @returns true if the input is valid, false otherwise.
     */
    public static CanSolve(input: WaterJugInput): boolean {
        if (input.z > input.x && input.z > input.y) {
            return false; //If z is greater than both x and y, then there is no solution
        } else if (input.x % 2 === 0 && input.y % 2 === 0 && input.z % 2 !== 0) {
            return false; //If x and y are even and z is odd, then there is no solution
        }
    
        return true;
    }
    
    /**
     * Tries to find the solution for the given input.
     * 
     * @param input The values to use in the Water Jug problem
     * 
     * @returns The solution if it exists, null otherwise.
     */
    public static FindSolution(input: WaterJugInput): WaterJugOutput | null {
        try {
            const xSteps: WaterJugOutput = [], ySteps: WaterJugOutput = [];

            //Run the solve function for both x and y as the main jug
            this.Solve(0, 0, input, 'x', xSteps);
            this.Solve(0, 0, input, 'y', ySteps);
            
            //If x is the shortest, return it
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
    
    /**
     * Recursive function that solves the Water Jug problem.
     * 
     * @param x The current amount of water in the first jug
     * @param y The current amount of water in the second jug
     * @param input The values to use in the Water Jug problem
     * @param mainJug The main jug to use for the next iteration
     * @param steps The steps that have been taken so far
     */
    private static Solve(x: number, y: number, input: WaterJugInput, mainJug: MainJug, steps: WaterJugOutput) {
        steps.push({ x, y }); //Add the current state to the steps array
    
        //If we have reached the goal, return
        if (x === input.z || y === input.z) {
            return;
        }
    
        //If the main jug is x, then we need to try to fill it up first
        if (mainJug === 'x') {
            //Empty y if it's full
            if (y === input.y) {
                this.Solve(x, 0, input, mainJug, steps);
            } else if (x === 0) { //Fill x if it's empty
                this.Solve(input.x, y, input, mainJug, steps)
            } else { //Transfer water from x to y
                const remSpace = input.y - y;
                const pouredWater = x > remSpace ? remSpace : x;
    
                this.Solve(x - pouredWater, y + pouredWater, input, mainJug, steps);
            }
        } else { //If the main jug is y, then we need to try to fill it up first
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