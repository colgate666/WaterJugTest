import { FastifyPluginAsync } from "fastify"
import { WaterJugInput, WaterJugOutput } from "../types/WaterJugTypes"
import { getWaterJugsStatus, handleWaterJugInput } from "../controllers/waterjug.controller"

const waterJugRouter: FastifyPluginAsync = async (fastify): Promise<void> => {
    fastify.get<{ Reply: WaterJugOutput }>('/status', getWaterJugsStatus)

    fastify.post<{ Body: WaterJugInput, Reply: WaterJugOutput | { message: string } }>('/', handleWaterJugInput)
}

export default waterJugRouter