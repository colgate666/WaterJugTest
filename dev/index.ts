import fastify from 'fastify';
import WaterJugRouter from "./routers/waterjug.router"

const server = fastify({ logger: true });

(async () => {
    await server.register(WaterJugRouter, { prefix: "/waterjug" })

    server.listen({
        port: 8080,
        host: "0.0.0.0"
    }, (err, address) => {
        if (err) {
            server.log.error(err);
            process.exit(1);
        }

        //Server is now listening on port 8080
    })
})()