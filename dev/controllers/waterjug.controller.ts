import { FastifyReply, FastifyRequest } from "fastify";
import { WaterJugInput, WaterJugOutput } from "../types/WaterJugTypes";
import { waterJugSolver } from "../utils/waterjug.solver";

export const handleWaterJugInput = async (
    req: FastifyRequest<{ Body: WaterJugInput }>, 
    res: FastifyReply) => {
    const body = await WaterJugInput.spa(req.body)

    if (!body.success) {
        return await res.status(400).send({ message: "Invalid request body" })
    } else if (body.data.z > body.data.x && body.data.z > body.data.y) {
        return await res.status(200).send({ message: "No solution" })
    }

    const solution = waterJugSolver(body.data.x, body.data.y, body.data.z)
    return await res.status(200).send(solution)
}

export const getWaterJugsStatus = async (req: FastifyRequest, res: FastifyReply) => {

}