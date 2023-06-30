import z from "zod"

export const WaterJugInput = z.object({
    x: z.number().int().min(1),
    y: z.number().int().min(1),
    z: z.number().int().min(1),
});

const WaterJugOutput = WaterJugInput.omit({
    z: true,
}).array()

export type WaterJugInput = z.infer<typeof WaterJugInput>;
export type WaterJugOutput = z.infer<typeof WaterJugOutput>;