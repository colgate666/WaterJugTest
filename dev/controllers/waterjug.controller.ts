import { FastifyReply, FastifyRequest } from "fastify";
import { WaterJugInput } from "../types/WaterJugTypes";
import { WaterJugSolver } from "../utils/waterjug.solver";

export const handleWaterJugInput = async (
    req: FastifyRequest<{ Body: WaterJugInput }>, 
    res: FastifyReply) => {
    const body = await WaterJugInput.spa(req.body)

    if (!body.success) {
        return await res.status(400).send({ message: "Invalid request body" })
    }
    
    if (!WaterJugSolver.CanSolve(body.data)) {
        return await res.status(200).send({ message: "No solution" })
    }

    const solution = WaterJugSolver.FindSolution(body.data)
    
    if (!solution) {
        return await res.status(500).send({ message: "Could not find solution!" })
    }

    return await res.status(200).send(solution)
}

export const getWaterJugsStatus = async (req: FastifyRequest, res: FastifyReply) => {
    return await res.status(200).send(WaterJugSolver.GetState())
}
